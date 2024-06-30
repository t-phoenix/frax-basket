import React from "react";
import {motion} from 'framer-motion'
import toast from "react-hot-toast";
import "../styles/common.css";
import InputBox from "../components/InputBox";
// import CiLogo from "../assets/CiLogo.png";
import frxBASKET from "../assets/frxBASKET.png"
import wfrxETHLogo from "../assets/wfrxETH.svg";
import fxsLogo from "../assets/fxs.svg";
import fraxLogo from "../assets/frax.svg";


//import OutBoxput from "../components/OutputBox";
import { useAccount, useContractReads, useNetwork } from "wagmi";
import {prepareWriteContract, writeContract} from "@wagmi/core"
import { Web3Button } from "@web3modal/react";
import { getFraxPrice, getFxsPrice, getTetherPrice, getfrxEtherPrice } from "../services/geckoApi";
import { ERCToken_ABI } from "../abis/ERCToken";
import { frax, fxs, index, issue, navissue, setvaluer, usdt, wfrxETH } from "../constants/contractAddress";
import { SetTokenABI } from "../abis/SetToken";
import { SetValuerABI } from "../abis/SetValuer";
import {ethers} from 'ethers';
import { NavIssueABI } from "../abis/NavIssue";
import { IoMdRefresh } from "react-icons/io";


export default function Fund() {
    const account = useAccount()
    console.log("Current Account:", account)
    const { chain } = useNetwork();

  const erctokenBalance = {
    abi: ERCToken_ABI,
    functionName: "balanceOf",
    args: [account.address],
  };
  const erctokenAllowance = {
    abi: ERCToken_ABI,
    functionName: "allowance",
    args: [account.address, navissue],
  };
  const { data } = useContractReads({
    contracts: [
      {
        ...erctokenBalance,
        address: wfrxETH,
      },
      {
        ...erctokenBalance,
        address: frax,
      },
      {
        ...erctokenBalance,
        address: fxs,
      },
      {
        address: index,
        abi: SetTokenABI,
        functionName: "balanceOf",
        args: [account.address],
      },
      {
        address: setvaluer,
        abi: SetValuerABI,
        functionName: "calculateSetTokenValuation",
        args: [index, usdt]
      }
    ],
  });

  {
    data && console.log("FRXB Set Valuer:", Number(data[4]) / 10 ** 8);
  }



    const [tokensList, setTokensList] = React.useState([{name:"wrapped ETH", symbol: "wfrxETH", src: wfrxETHLogo , address: wfrxETH, balance: data && Number(data[0]) / 10 ** 18, value: "3.35", price: "3357.54"}, 
                        {name:"Frax", symbol: "FRAX", src: fraxLogo, address: frax, balance:  data && Number(data[1]) / 10 ** 18, value: "3.03", price: "1.01" }, 
                        {name:"Frax Share", symbol:"FXS", src: fxsLogo, address: fxs, balance:  data && Number(data[2]) / 10 ** 18, value: "3.65", price: "3.65"}
                      ])
    const [tokensList2, setTokensList2] =React.useState([{name:"Frax Basket", symbol: "FRXB", src: frxBASKET , address: index, balance: data && Number(data[3]) / 10 ** 18, value: "200", price: data && Number(data[4])/10 ** 8 }]) 
  


    const [isInputINDEX, setIsInputINDEX] = React.useState(false)

    const [inputAmout, setInputAmount] = React.useState("0.0");
    const [inputAmtValue, setInputAmtValue] = React.useState(0);
    const [selectedInputAsset, setSelectedInputAsset] = React.useState(tokensList[0]);
    
    const [outputAmout, setOutputAmount] = React.useState("0.0")
    const [outputAmtValue, setOutputAmtValue] = React.useState(0);
    const [selectedOutputAsset, setSelectedOutputAsset] = React.useState(tokensList2[0])

    
    React.useEffect(()=>{
        const calculatedOutputAmount = inputAmout*selectedInputAsset.price/selectedOutputAsset.price
        setOutputAmount(calculatedOutputAmount);
        setOutputAmtValue(calculatedOutputAmount*selectedOutputAsset.price);
    }, [inputAmout])

    function changeAssets(){
        setIsInputINDEX(!isInputINDEX)
        const tempList = selectedInputAsset;
        setSelectedInputAsset(selectedOutputAsset)
        setSelectedOutputAsset(tempList)
        setInputAmount(0.0)
        setOutputAmount(0.0)
        setInputAmtValue(0.0)
    }

    async function handleSwap(){
        // toast(`${outputAmout} INDEX minted succesfully. \n Transaction:  ${account.address}`)
        if(!isInputINDEX){
          console.log("input Index? ", isInputINDEX)
          // issue
          const issueValue = ethers.utils.parseUnits(inputAmout, 'ether')
          console.log("Issue Value of input in Ethers", Number(issueValue))

          // const recieveValue =  ethers.utils.parseUnits(outputAmout, 'ether');
          // console.log("Issue Value of outpur in Ethers", recieveValue)

          console.log("args", selectedInputAsset.address)

          const config = await prepareWriteContract({
            address: navissue,
            abi: NavIssueABI,
            functionName: "issue",
            args: [index, selectedInputAsset.address, issueValue, 0, account.address]
          })

          try {
            const { hash } = await writeContract(config);
            console.log("Mint INDEX Hash:", hash);
            toast.success(`FRXB Issued Successfully: ${hash}`)
          } catch (error) {
            console.log("Error! While minting INDEX tokens",error);
            toast.error("Error! could not Issue FRXB INDEX Tokens");
          }


        } else {
          console.log("input Index? ", isInputINDEX)
          // redeem
          const issueValue = ethers.utils.parseUnits(inputAmout, 'ether')
          console.log("Issue Value of input in Ethers", Number(issueValue))

          // const recieveValue =  ethers.utils.parseUnits(outputAmout, 'ether');
          // console.log("Issue Value of outpur in Ethers", recieveValue)

          console.log("args", selectedOutputAsset.address)

          const config = await prepareWriteContract({
            address: navissue,
            abi: NavIssueABI,
            functionName: "redeem",
            args: [index, selectedOutputAsset.address, issueValue, 0, account.address]
          })

          try {
            const { hash } = await writeContract(config);
            console.log("Mint INDEX Hash:", hash);
            toast.success(`FRXB Redeem Successfull ${hash}`)
          } catch (error) {
            console.log("Error! While minting INDEX tokens",error);
            toast.error("Error! could not Redeem FRXB INDEX Tokens");
          }

        }

    }

    // async function handleMint(){
    //   toast('Iniitiating...')
    //   const mintValue = ethers.utils.parseUnits(inputAmout, 'ether')
    //   console.log("Mint Value in Ethers", mintValue)
  
    //   const config = await prepareWriteContract({
    //     address:issue,
    //     abi: BasicIssueABI,
    //     functionName: "issue",
    //     args: [index, mintValue, account.address]
    //   })
  
    //   try {
    //     const { hash } = await writeContract(config);
    //     console.log("Mint INDEX Hash:", hash);
    //     toast.success(`INDEX MINT Successfully: ${hash}`)
    //   } catch (error) {
    //     console.log("Error! While minting INDEX tokens",error);
    //     toast.error("Error! could not mint INDEX Tokens");
    //   }



    const [indexPrice, setIndexPrice] = React.useState(data && Number(data[4])/10**8)

    React.useEffect(()=>{
      setPrices()
    },[data])
  
    async function setPrices(){
      try {
        const wfrxETHPrice = await getfrxEtherPrice();
        // tokensList[0].price = wfrxETHPrice

        const fraxPrice = await getFraxPrice();
        // tokensList[1].price = fraxPrice

        const fxsPrice = await getFxsPrice();
        // tokensList[2].price = fxsPrice

        if(data){
          setTokensList([{...tokensList[0], value: wfrxETHPrice * Number(data[0]/ 10**18), price: wfrxETHPrice}, {...tokensList[1], value: fraxPrice * Number(data[1]) / 10**18, price: fraxPrice}, {...tokensList[2], value: fxsPrice * Number(data[2])/ 10**18, price: fxsPrice}])
        }

        const indexprice = (0.001*wfrxETHPrice) + fxsPrice + (3*fraxPrice);
        console.log("Price of INDEX token:", indexprice)
        setIndexPrice(indexprice)
      } catch (error) {
        console.log("Error setting data:", error)
      }
      
    }


  return (
    <div className="main-content">

      <div className="trade-box">
        <br/>
        <div className="wide-apart-row">
          <div>
          <h1 style={{ textAlign: "start" }}>Swap</h1>
          <p style={{ textAlign: "start", fontSize: '12px' }}>Swap FXRB using single Asset</p>
          <p
            style={{
              textAlign: "start",
              fontSize: "14px",
              color: "#52BAD1",
              marginBlock: "8px",
              fontWeight: "700",
            }}
          >
            〽️ 1 FRXB = $ {data ? (Number(data[4])/10 ** 8).toLocaleString() : Number(indexPrice).toLocaleString()}
          </p>
          </div>

          <motion.div onClick={()=>window.location.reload()} whileHover={{rotate: '270deg', scale: 1.2}} transition={{duration: 0.3}} whileTap={{scale: 0.8}} style={{x: "-20px", y: "20px", borderRadius: '10px', backgroundColor: '#303a4f', height: "36px", width: '36px',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4px', marginLeft: '6vw'}}>
            <IoMdRefresh size={24}/>
          </motion.div>
        </div>
        <br/>
        <br/>
        <br/>
        <InputBox inputAmout={inputAmout} setInputAmount={setInputAmount} inputAmtValue={inputAmtValue} setInputAmtValue={setInputAmtValue} selectedAsset={selectedInputAsset} setSelectedAsset={setSelectedInputAsset} tokensList={isInputINDEX? tokensList2 : tokensList}/>
        <div className="center-in-row" >
            <motion.p whileHover={{scale: 1.2}} whileTap={{scale: 0.8}} onClick={changeAssets} style={{width: '30px', fontSize: '24px', fontWeight: '700', backgroundColor: "#52BAD1", color: '#000000', borderRadius: '8px'}}>↕</motion.p>
        </div>
        <InputBox inputAmout={outputAmout} setInputAmount={setOutputAmount} inputAmtValue={outputAmtValue} setInputAmtValue={setOutputAmtValue} selectedAsset={selectedOutputAsset} setSelectedAsset={setSelectedOutputAsset} isOutput={true} tokensList={isInputINDEX? tokensList: tokensList2}/>
        <br/>
        <br/>
        <br/>
        <div style={{textAlign: 'start', fontSize: '12px', marginLeft: '4px'}}>
            <p><b>Deposit:</b> {Number(inputAmout).toLocaleString()} {selectedInputAsset.symbol}</p>
            <p style={{marginBlock: '8px'}}><b>You Receive:</b> {Number(outputAmout).toLocaleString()} {selectedOutputAsset.symbol}</p>
            <p><b>Total Value:</b> ${Number(inputAmtValue).toLocaleString()}</p>
        </div>
        <br/>
        <br/>
        <div className="center-in-row" >
        {/* <button style={{backgroundColor: "#cccbcb"}}>Coming Soon</button> */}
        </div>
        {/* {account.address ? <div className="center-in-row"><button onClick={buyINDEX}>Fund</button></div> : <Web3Button />} */}
        {account.address ? (
          <>
            {chain.id === 252 ? (
              <div className="center-in-row">
                  <button onClick={handleSwap}>Swap</button>
              </div>
            ) : (
              <p>Please connect to Fraxtal Mainnet</p>
            )}
          </>
        ) : (
          <Web3Button />
        )}
        <br/>
        <br/>
      </div>
    </div>
  );
}
