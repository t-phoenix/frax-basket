import React from "react";
import "../../styles/analytics.css";
import { index, controller, issue, manager, wbtc, weth, usdt, wfrxETH, frax, fxs  } from "../../constants/contractAddress";

export default function ContractInfo(){
    const contractAddr = [{name: "INDEX Token", address: index}, {name: "Controller", address: controller}, 
                            {name: "Issuing Module", address: issue}, {name: "Manager", address: manager}, 
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
                    <a href={`https://testnet.bscscan.com/address/${contractInfo.address}`} target="blank">{contractInfo.address}</a>
                </div>
            ))}
                        
        </div>
    )
}

// Contract Addresses - Token/ Controller/ BIM/ Oracle
// Owner/Manager Address
// Fee - Entry/ Exit/ Protocol/ Management

