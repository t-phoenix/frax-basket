import React from "react";
import "../../styles/analytics.css";
import { useContractReads } from "wagmi";
import { index, wfrxETH, frax, fxs } from "../../constants/contractAddress";
import { ERCToken_ABI } from "../../abis/ERCToken";
import { getfrxEtherPrice, getFraxPrice, getFxsPrice } from "../../services/geckoApi";

export default function Composition(){
    const {data} = useContractReads({
        contracts: [
            {
                address: wfrxETH,
                abi: ERCToken_ABI,
                functionName: "balanceOf",
                args: [index]
            },
            {
                address: frax,
                abi: ERCToken_ABI,
                functionName: "balanceOf",
                args: [index]
            },
            {
                address: fxs,
                abi: ERCToken_ABI,
                functionName: "balanceOf",
                args: [index]
            }
        ]
    })
    const [wfrxETHPrice, setwfrxETHPrice ] = React.useState("3378.56")
    const [fraxPrice, setFraxPrice ] = React.useState("1.01")
    const [fxsPrice, setFxsPrice ] = React.useState("3.56")

    const [ wfrxETHValue,  setwfrxETHValue ] = React.useState("1470796.86")
    const [ fraxValue,  setFraxValue ] = React.useState("1784247.36")
    const [ fxsValue, setFxsValue ] = React.useState("1200806.12")

    const [wfrxETHAllocation, setwfrxETHAllocation] = React.useState("32");
    const [fraxAllocation, setFraxAllocation] = React.useState("39");
    const [fxsAllocation, setFxsAllocation] = React.useState("29");

    // console.log("INDEX CONTRACT BALANCE: ", Number(data[0]), Number(data[1]))
    const assetData = [
                        {name: "Frax Ether", symbol: "wfrxETH", balance: data ? Number(data[0])/10**18: "0.001", price: wfrxETHPrice, change24H: "+9.6", value: wfrxETHValue, allocation: wfrxETHAllocation},
                        {name: "Frax", symbol: "FRAX", balance: data ? Number(data[1])/10**18: "3.25", price: fraxPrice, change24H: "+9.6", value: fraxValue, allocation: fraxAllocation},
                        {name: "Frax Share", symbol: "FXS", balance: data ? Number(data[2])/10**18: "1.08", price: fxsPrice, change24H: "+9.6", value: fxsValue, allocation: fxsAllocation}
                    ]

    React.useEffect(()=>{
        setPrices()
    },[])     
    async function setPrices(){
        try {
        //   const btcprice = await getBitcoinPrice();
        //   const ethprice = await getEthereumPrice();
        //   const usdtprice = await getTetherPrice();
        const frxETHprice = await getfrxEtherPrice();
        const fraxprice = await getFraxPrice();
        const fxsprice = await getFxsPrice();
        setwfrxETHPrice(frxETHprice);
        setFraxPrice(fraxprice);
        setFxsPrice(fxsprice);
          if(data){
            const wfrxETH_value = (Number(data[0])/10**18)*frxETHprice;
            const frax_value = (Number(data[1])/10**18)*fraxprice;
            const fxs_value = (Number(data[2])/10**18)*fxsprice;
            const total_value = wfrxETH_value + frax_value + fxs_value;
            setwfrxETHValue(wfrxETH_value)
            setFraxValue(frax_value)
            setFxsValue(fxs_value)
            setwfrxETHAllocation(wfrxETH_value*100/total_value);
            setFraxAllocation(frax_value*100/total_value);
            setFxsAllocation(fxs_value*100/total_value); 
          } 
        } catch (error) {
          console.log("Error setting data:", error)
          setwfrxETHPrice("64034.56");
          setFraxPrice("4765.83");
          setFxsPrice("1.001");
          setwfrxETHValue("1470796.86")
          setFraxValue("1784247.36")
          setFxsValue("1200806.12")
          setwfrxETHAllocation("31.3");
          setFraxAllocation("38.6");
          setFxsAllocation("28.1");  
        }
        
      }               

    return(
        <div style={{marginBlock: '10%'}}>
            <h1 style={{marginBlock: '1%'}}>Token Holdings</h1>
            <div className="wide-apart-row composition-heading">
                {/* //Title */}
                <p>ASSET</p>
                <div style={{display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-evenly'}}>
                <p className="element-box">BALANCE</p>
                <p className="element-box">PRICE</p>
                {/* <p className="element-box">CHANGE 24H</p> */}
                <p className="element-box">VALUE</p>
                <p className="element-box">ALLOCATION</p>
                </div>
            </div>
            
            {/* Assets */}
            {data && assetData.map((asset, index)=>(
                <div key={index} className="wide-apart-row composition-row">
                    <p style={{fontWeight: '700'}}>{asset.name}</p>
                    <div style={{display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-evenly'}}>
                    <p className="element-box">{Number(asset.balance).toLocaleString()} ({asset.symbol})</p>
                    <p className="element-box">$ {Number(asset.price).toLocaleString()}</p>
                    {/* <p className="element-box">{asset.change24H} %</p> */}
                    <p className="element-box">$ {Number(asset.value).toLocaleString()}</p>
                    <p className="element-box">{Number(asset.allocation).toLocaleString()} %</p>
                    </div>
                    
                </div>
            ))}
            


        </div>
    )
}