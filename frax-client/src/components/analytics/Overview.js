import React, {useRef} from "react";
import tether from "../../assets/usdt.svg"
// import CiLogo from "../../assets/CiLogo.png";
import frxBASKET from "../../assets/frxBASKET.png"
import { useContractReads } from "wagmi"; 
import { index, setvaluer, usdt } from "../../constants/contractAddress";
import { SetTokenABI } from "../../abis/SetToken";
import { getfrxEtherPrice, getFraxPrice, getFxsPrice, getTetherPrice } from "../../services/geckoApi"
import { useScroll } from "framer-motion";
import { SetValuerABI } from "../../abis/SetValuer";


export default function Overview (){
  const {data} = useContractReads({
    contracts: [
      {
        address: index,
        abi: SetTokenABI,
        functionName: 'totalSupply'
      },
      {
        address: setvaluer,
        abi: SetValuerABI,
        functionName: "calculateSetTokenValuation",
        args: [index, usdt]
      }
      
    ]
  })
  const [indexPrice, setIndexPrice] = React.useState(data && Number(data[1])/10**8)
  const [aum, setAum] = React.useState("15.56")

  // const [overviewData, setOverviewData] = React.useState([
  //   { title: "Asset Under Management", value: "47657990.95" },
  //   { title: "Token In Circulation", value: Number(data[0])/ 10**18},
  //   { title: "Index Price", value: "146700.8"},
  //   { title: "Denomination Asset", value: "USDT" },
  // ]);
  React.useEffect(()=>{
    setPrices()
  },[])

  async function setPrices(){
    try {
      const frxETHprice = await getfrxEtherPrice();
      const fraxprice = await getFraxPrice();
      const fxsprice = await getFxsPrice();
     
      const usdtprice = await getTetherPrice();
      const indexprice = (0.001*frxETHprice) + fxsprice + (3*fraxprice);
      console.log("Price of frax Basket token:", indexprice)
      if(indexprice != 0 ){
        setIndexPrice(indexprice)
        if(data){
          setAum((data[0]/10**18)*indexprice)
        }
    }
      
    } catch (error) {
      console.log("Error setting data:", error)
    }
    
  }
  const carouselRef = useRef(null)
const { scrollX } = useScroll({
  container: carouselRef
})

    return(
        <div className="center-in-row" ref={carouselRef}>
          
          <div className="small-box">
            <h3 className="box-data">${Number(aum).toLocaleString()}</h3>
            <p className="box-title">Asset Under Management</p>
          </div>
          <div className="small-box">
            <h3 className="box-data">🪙 {data ? Number(data[0]/10**18).toLocaleString(): 4.27} FRXB</h3>
            <p className="box-title">Token In Circulation</p>
          </div>
          <div className="small-box">
            <h3 className="box-data"><img src={frxBASKET} style={{height: '28px',marginRight: '6px'}}/>${Number(indexPrice).toLocaleString()}</h3>
            <p className="box-title">frxBASKET Price</p>
          </div>
          <div className="small-box">
            <h3 className="box-data"><img src= {tether} style={{marginRight: '6px'}}/> USDT</h3>
            <p className="box-title">Denomination Asset</p>
          </div>
        </div>
    )
}