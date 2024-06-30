import React from "react";
import "../../styles/analytics.css";
import { index, controller, issue, manager, wbtc, weth, usdt, wfrxETH, frax, fxs, navissue, oracle, setvaluer, integration, generalindex, fraxswapadapter  } from "../../constants/contractAddress";

export default function ContractInfo(){
    const contractAddr = [{name: "Manager", address: manager}, {name: "INDEX Token (FRXB)", address: index}, 
                            {name: "Basic Issuing Module", address: issue}, {name: "Net Asset Value Issue Module", address: navissue},
                            {name: "Controller", address: controller}, {name: "Price Oracle", address: oracle},
                            {name:"FRXB Valuer", address: setvaluer },{name:"Integration Registry", address: integration},
                            {name:"General Index Module", address: generalindex},{name:"Frax Swap Adapter", address: fraxswapadapter},
                            {name: "Wrapped Frax Ether (wfrxETH)", address: wfrxETH}, {name: "Frax Stablecoin (FRAX)", address: frax},
                            {name: "Frax Share (FXS)", address: fxs}, ] 

    const fee = [{type: "Entry", }]                        
    return(
        <div style={{marginBottom: '20%'}}>
            <h1>Contract Information</h1>
            <div className="composition-heading simple-row" >
                <p className="title-box">Verified System Contracts</p>
                <p>Address</p>
            </div>

            {contractAddr.map((contractInfo)=>(
                <div key={contractInfo.address} className="composition-row simple-row">
                    <p className="title-box">{contractInfo.name}</p>
                    <a href={`https://fraxscan.com/address/${contractInfo.address}`} target="blank">{contractInfo.address}</a>
                </div>
            ))}
                        
        </div>
    )
}

// Contract Addresses - Token/ Controller/ BIM/ Oracle
// Owner/Manager Address
// Fee - Entry/ Exit/ Protocol/ Management

