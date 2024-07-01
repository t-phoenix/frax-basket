import React from "react";
import Overview from "../components/analytics/Overview";
import RebalanceComposition from "../components/analytics/RebalanceComposition";


export default function Rebalance() {
    return (
        <div className="main-content">
            <div style={{ width: "800px",textAlign: "start"}}>
            <h1>Rebalance Frax Basket</h1>
            <p style={{ width: "60%", fontSize: "14px", marginBlock: "8px", marginLeft: '0px' , textAlign: 'start'}}>
                Rebance can only be initiated by Manager, and then is a multistep process to trade assets
            </p>
            <br/>
            <br/>
            <Overview />
            <RebalanceComposition />
            </div>
        </div>
    )
}