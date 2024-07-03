import React from "react";
import { motion } from "framer-motion";
import "../styles/common.css";
import InputBox from "../components/InputBox";
import frxBASKET from "../assets/frxBASKET.png";
import { useAccount, useNetwork } from "wagmi";
import { Web3Button } from "@web3modal/react";
import MultiAsset from "../components/MultiAsset";
import SubNav from "../components/common/SubNav";

import wfrxETHLogo from "../assets/wfrxETH.svg";
import fraxLogo from "../assets/frax.svg";
import fxsLogo from "../assets/fxs.svg";
import { useContractReads } from "wagmi";
import { index, issue, wfrxETH, frax, fxs } from "../constants/contractAddress";
import { ERCToken_ABI } from "../abis/ERCToken";
import { SetTokenABI } from "../abis/SetToken";
import {
  getfrxEtherPrice,
  getFraxPrice,
  getFxsPrice
} from "../services/geckoApi";
import { IoMdRefresh } from "react-icons/io";
import {prepareWriteContract, writeContract} from "@wagmi/core"
import { BasicIssueABI } from "../abis/BasicIssue";
import {ethers} from 'ethers';
import toast from "react-hot-toast";



export default function DemoApp() {
  const account = useAccount();
  const { chain } = useNetwork();

  const erctokenBalance = {
    abi: ERCToken_ABI,
    functionName: "balanceOf",
    args: [account.address],
  };
  const erctokenAllowance = {
    abi: ERCToken_ABI,
    functionName: "allowance",
    args: [account.address, issue],
  };
  const { data } = useContractReads({
    contracts: [
      {
        ...erctokenBalance,
        address: wfrxETH,
      },
      {
        ...erctokenBalance,
        address: fxs,
      },
      {
        ...erctokenBalance,
        address: frax,
      },
      {
        ...erctokenAllowance,
        address: wfrxETH,
      },
      {
        ...erctokenAllowance,
        address: fxs,
      },
      {
        ...erctokenAllowance,
        address: frax,
      },
      {
        address: index,
        abi: SetTokenABI,
        functionName: "balanceOf",
        args: [account.address],
      },
    ],
  });

  // {
  //   data && console.log("Your INDEX Balance", Number(data[6]) / 10 ** 18);
  // }

  const [indexPrice, setIndexPrice] = React.useState("4.4");

  const tokensList = [
    {
      name: "Frax Basket",
      symbol: "FRXB",
      src: frxBASKET,
      address: "",
      balance: data ? Number(data[6]) / 10 ** 18 : 0,
      value: "200",
      price: indexPrice,
    },
  ];
  const outputTokensList = [{  name: "wrapped ETH",  symbol: "wfrxETH",  src: wfrxETHLogo,  address: "",  balance: data && Number(data[0]) / 10 ** 18,  value: "68.90",  price: "52315.54",  delegateBalance: data && Number(data[3]) / 10 ** 18,},
                            {  name: "Frax Share",  symbol: "FXS",  src: fxsLogo,  address: "",  balance: data && Number(data[1]) / 10 ** 18,  value: "322",  price: "3219.28",  delegateBalance: data && Number(data[4]) / 10 ** 18,},
                            {  name: "Frax",  symbol: "FRAX",  src: fraxLogo,  address: "",  balance: data && Number(data[2]) / 10 ** 18,  value: "100",  price: "1.00",  delegateBalance: data && Number(data[5]) / 10 ** 18,}];

  const appOptions = [
    { id: "mint", title: "MINT" },
    { id: "redeem", title: "REDEEM" },
  ];

  const [selectedAppOption, setSelectedAppOption] = React.useState(appOptions[0]);
  const [inputAmout, setInputAmount] = React.useState("0.0");
  const [inputAmtValue, setInputAmtValue] = React.useState(0);
  const [selectedInputAsset, setSelectedInputAsset] = React.useState(tokensList[0]);

  const [outputAmount, setOutputAmount] = React.useState({wfrxETH: 0.0, FXS: 0.0, FRAX: 0.0});

  React.useEffect(() => {
    setOutputAmount({
      wfrxETH: 0.001 * inputAmout,
      FXS: inputAmout,
      FRAX: 3 * inputAmout,
    });
    getIndexPrice();
  }, [inputAmout, getIndexPrice]);

  async function getIndexPrice() {
    try {
      const frxETHprice = await getfrxEtherPrice();
      const fraxprice = await getFraxPrice();
      const fxsprice = await getFxsPrice();
      const indexprice = (0.001*frxETHprice) + fxsprice + (3*fraxprice);
      console.log("Price of frax Basket token:", indexprice)
      setIndexPrice(String(indexprice));
      tokensList[0].price = indexprice
    } catch (error) {
      console.log("Error setting data:", error);
      setIndexPrice("9.8");
      tokensList[0].price = 9.8
    }
  }

  async function handleMint(){
    toast('Iniitiating...')
    const mintValue = ethers.utils.parseUnits(inputAmout, 'ether')
    console.log("Mint Value in Ethers", mintValue)

    const config = await prepareWriteContract({
      address:issue,
      abi: BasicIssueABI,
      functionName: "issue",
      args: [index, mintValue, account.address]
    })

    try {
      const { hash } = await writeContract(config);
      console.log("Mint INDEX Hash:", hash);
      toast.success(`INDEX MINT Successfully: ${hash}`)
    } catch (error) {
      console.log("Error! While minting INDEX tokens",error);
      toast.error("Error! could not mint INDEX Tokens");
    }
  }

  async function handleRedeem(){
    toast('Iniitiating...')
    const redeemValue = ethers.utils.parseUnits(inputAmout, 'ether')
    console.log("Redeem Value in Ethers", (Number(data[6])/10**18), " : ", Number(redeemValue))
    if((Number(redeemValue)/10**18) < (Number(data[6])/10**18)){
      const config = await prepareWriteContract({
        address:issue,
        abi: BasicIssueABI,
        functionName: "redeem",
        args: [index, redeemValue, account.address]
      })
  
      try {
        const { hash } = await writeContract(config);
        console.log("Redeem INDEX Hash:", hash);
        toast.success(`INDEX Redeem Successful  ${hash}`)
      } catch (error) {
        console.log("Error! While Redeeming INDEX tokens",error);
        toast.error("Error! could not redeem INDEX Tokens");
      }
    } else {
      toast.error("Amount Should be Less than User Balance")
    }    
  }


  return (
    <div className="main-content">
      <div className="trade-box">
        <div className="wide-apart-row">
        <div>
        {selectedAppOption.id === "mint" ? (
          <h1 style={{ textAlign: "start" }}>Mint FRXB</h1>
        ) : (
          <h1 style={{ textAlign: "start" }}>Redeem FRXB</h1>
        )}
        <p style={{ textAlign: "start", fontSize: "12px" }}>
          This app uses Basic Issue Module 
        </p>
        <p
          style={{
            textAlign: "start",
            fontSize: "14px",
            color: "#52BAD1",
            marginBlock: "8px",
            fontWeight: "700",
          }}
        >
          〽️ 1 FRXB = 0.001 wfrxETH + 1 FXS + 3 FRAX
        </p>
        </div>
        <motion.div onClick={()=>window.location.reload()} whileHover={{rotate: '270deg', scale: 1.2}} transition={{duration: 0.3}} whileTap={{scale: 0.8}} style={{x: "-20px", y: "20px", borderRadius: '10px', backgroundColor: '#303a4f', height: "36px", width: '36px',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4px', marginLeft: '6vw'}}>
          <IoMdRefresh size={24}/>
        </motion.div>
        </div>
        <br />
        <SubNav
          options={appOptions}
          selectedOption={selectedAppOption}
          setSelectedOption={setSelectedAppOption}
        />
        <br />
        <br />
        {data && (
          <InputBox
            inputAmout={inputAmout}
            setInputAmount={setInputAmount}
            inputAmtValue={inputAmtValue}
            setInputAmtValue={setInputAmtValue}
            isMulyiAsset={false}
            selectedAsset={selectedInputAsset}
            setSelectedAsset={setSelectedInputAsset}
            tokensList={tokensList}
          />
        )}
        {data && (
          <MultiAsset
            enableDelegate={selectedAppOption.id === "mint" ? true : false}
            outputAmount={outputAmount}
            outputTokensList={outputTokensList}
          />
        )}
        <div style={{width: '96%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
          <a href={`https://app.frax.finance/swap/main`} target="blank">Frax Swap ↗</a>
        </div>  
        <br />
        {account.address ? (
          <>
            {chain.id === 252 ? (
              <div className="center-in-row">
                {selectedAppOption.id === "mint" ? (
                  <button onClick={handleMint}>Mint</button>
                ) : (
                  <button onClick={handleRedeem}>Redeem</button>
                )}
              </div>
            ) : (
              <p>Please connect to Fraxtal Mainnet</p>
            )}
          </>
        ) : (
          <Web3Button />
        )}
        <br />
        <br />
      </div>
    </div>
  );
}