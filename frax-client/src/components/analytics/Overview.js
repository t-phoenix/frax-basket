import React, {useRef} from "react";
import tether from "../../assets/usdt.svg"
// import CiLogo from "../../assets/CiLogo.png";
import frxBASKET from "../../assets/frxBASKET.png"
import { useContractReads } from "wagmi"; 
import { index, setvaluer, usdt } from "../../constants/contractAddress";
import { SetTokenABI } from "../../abis/SetToken";
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
  const [indexPrice] = React.useState(data && Number(data[1])/10**8)
  const [aum] = React.useState(data && ((Number(data[0])/10**18) *(Number(data[1]/10**8))))

  const carouselRef = useRef(null)
 

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
            <h3 className="box-data"><img alt="frax basket" src={frxBASKET} style={{height: '28px',marginRight: '6px'}}/>${Number(indexPrice).toLocaleString()}</h3>
            <p className="box-title">frxBASKET Price</p>
          </div>
          <div className="small-box">
            <h3 className="box-data"><img alt="tether" src= {tether} style={{marginRight: '6px'}}/> USDT</h3>
            <p className="box-title">Denomination Asset</p>
          </div>
        </div>
    )
}