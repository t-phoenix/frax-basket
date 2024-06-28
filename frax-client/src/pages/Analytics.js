import React from "react";
import "../styles/analytics.css";

import Overview from "../components/analytics/Overview";
import HistoryGraph from "../components/analytics/HistoryGraph";
import Composition from "../components/analytics/Composition";
import ContractInfo from "../components/analytics/ContractInfo";



export default function Analytics() {
  
  return (
    <div className="main-content">
      <div style={{ width: "800px",textAlign: "start"}}>
        <h1 style={{textAlign: 'start'}}>Frax Basket Index Fund</h1>
        <p style={{ width: "60%", fontSize: "14px", marginBlock: "8px", marginLeft: '0px' , textAlign: 'start'}}>
          A balanced Frax Crypto Index Fund to simplify Crypto Investments in Frax ecosystem tokens
        </p>
        
        <p
          style={{
            textAlign: "start",
            fontSize: "14px",
            color: "#52BAD1",
            marginTop: "24px",
            fontWeight: "700",
          }}
        >
          〽️ 1 frxBASKET = 0.001 wfrxETH + 1 FXS + 3 FRAX
        </p>
        
        <br/>
        <Overview />
        <HistoryGraph /> 
        <Composition />
        <ContractInfo />


      </div>
    </div>
  );
}

// TODO
// AUM / Token in Circulation/ AVG Return / Denomination
// Graph - AUM / share Price / Seperate Component Graphs
// Components (BTC/ETH/USDT) - AUM/ Price/ Value
// Contract Info
// Activity - Deposit/ Redemption
