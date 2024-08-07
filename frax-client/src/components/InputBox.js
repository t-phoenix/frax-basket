import React from "react";
import {motion} from 'framer-motion';
import "../styles/common.css";
import AssetMenu from "./common/AssetMenu";
import {MdAccountBalanceWallet} from 'react-icons/md'

export default function InputBox({ inputAmout, setInputAmount, inputAmtValue, setInputAmtValue, isMultiAsset, selectedAsset, setSelectedAsset, isOutput = false, tokensList }) {
  const [showAssetList, setShowAssetList] = React.useState(false);
  
  function onInputChange(e) {
    setInputAmount(e.target.value);
    setInputAmtValue(e.target.value * selectedAsset.price);
  }

  function handleSelectAsset() {
    setShowAssetList(!showAssetList);
    setInputAmount(0);
    setInputAmtValue(0);
  }

  return (
    <div className="input-box" style={{marginBlock: '-10px'}}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          
        }}
      >
        {!isOutput ? <input
          value={inputAmout}
          onChange={onInputChange}
          type="integer"
          placeholder="0.0"
          style={{
            margin: "5px",
            backgroundColor: "transparent",
            color: "#52BAD1",
            width: "50%",
          }}
        />: <h1 className="output-amount">{Number(inputAmout).toLocaleString()}</h1>
      }
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "30%",
          }}
        >
          {tokensList.length === 1  ? 
          <div className="asset-button" style={{backgroundColor: "#303a4f", color: "#ffffff", borderColor: "#cccbcb", borderStyle: "solid"}}>
            <img alt={selectedAsset.src} src={selectedAsset.src} style={{width: '28px'}}/>
            <p style={{fontSize: '14px', fontWeight: '640', marginInline: '6px'}}>{selectedAsset.symbol}</p>
          </div>:
          <motion.div className="asset-button" onClick={handleSelectAsset} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
            <img alt={selectedAsset.src} src={selectedAsset.src} style={{width: '30px', backgroundColor: "#191e29", borderRadius: '25px', marginRight: '4px'}}/>
            <p style={{fontSize: '14px', fontWeight: '640', marginInline: '6px'}}>{selectedAsset.symbol}</p>
          </motion.div>}
          {showAssetList ? (
            <AssetMenu setShowAssetList={setShowAssetList}  setSelectedAsset={setSelectedAsset} tokensList={tokensList}/>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: "1vw",
          fontSize: "12px"
        }}
      >
        <p>$ {Number(inputAmtValue).toLocaleString()}</p>
        <p style={{marginRight: '8px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <MdAccountBalanceWallet size={20} style={{marginRight: '2px'}}/> : {Number(selectedAsset.balance).toLocaleString()} {selectedAsset.symbol}
        </p>
      </div>
    </div>
  ); 
}
