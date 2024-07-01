// Rebalancing is a mul;tistep process
// Manager initiate Start Rebalance
// Can include new assets and their target components, also need old asset target components, and current position multiplier

// Start Trade 
// Check Component Trade Quantity and Direction
// Can use Index's holding balances to confirm the updates
// All assets to be sold are to be converted in wETH
// All assets to be bought are to be done using wETH
// Special functions are there to clear remaining balances - To be Explored, not in this file/


const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();
  const owner = accounts[0];
  console.log("OWNER ADDRESS: ", owner.address)


  const wfrxETH = await hre.ethers.getContractAt('ERC20', '0xFC00000000000000000000000000000000000006')
  const FXS = await hre.ethers.getContractAt('ERC20', '0xFC00000000000000000000000000000000000002')
  const FRAX = await hre.ethers.getContractAt('ERC20', '0xFc00000000000000000000000000000000000001');
  const USDT = await hre.ethers.getContractAt('ERC20', '0x4d15EA9C2573ADDAeD814e48C148b5262694646A');
  
  const controller = await hre.ethers.getContractAt("Controller", '0x36a7a778DF69B6888045a708624477CAb45d0B96')
  const basicIssueModule = await hre.ethers.getContractAt("BasicIssuanceModule", "0x80884b6690fd795aDB9D132Bc38b4184663EC72b")
  const frxBASKET = await hre.ethers.getContractAt("SetToken", '0xC8B1d9A663eFcd38b1CE6712078176558063e7bC')




  const priceOracle = await hre.ethers.getContractAt("PriceOracle", '0xf2402903F7106e8a403838a18787882aA5a802f5');
  const setValuer = await hre.ethers.getContractAt("SetValuer", '0xCEDB9A8f969E075E2D0aA3280D13cEDAed2bE5A9');
  const NAVModule = await hre.ethers.getContractAt("CustomOracleNavIssuanceModule", '0xd4B973F5b0ef988832C640c4DBA59AA16E2D7e47');

  const integrationRegistry = await hre.ethers.getContractAt("IntegrationRegistry", '0x0ef0AFaF3E487Cd5c9AC845D6d4890e5e3439b0f');
  const generalIndex = await hre.ethers.getContractAt("GeneralIndexModule", '0xdB4c154797086Dcb89e862520ca3d688d39829EF');


  const posMultiplier = await frxBASKET.positionMultiplier();
  console.log("POSITION MULTIPLIER: ", posMultiplier);

 

  const wfrxETHDirection = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, wfrxETH.target)
  console.log("wfrxETH Direction: ",wfrxETHDirection[0], Number(wfrxETHDirection[1])/10**18 );

  const FRAXDirection = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, FRAX.target)
  console.log("FRAX Direction: ",FRAXDirection[0], Number(FRAXDirection[1])/10**18 );

  const FXSDirection = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, FXS.target)
  console.log("FXS Direction: ",FXSDirection[0], Number(FXSDirection[1])/10**18 );


  const wfrxETHbalance = await wfrxETH.balanceOf(frxBASKET.target);
  const FRAXbalance =  await FRAX.balanceOf(frxBASKET.target);
  const FXSbalance =  await FXS.balanceOf(frxBASKET.target);
  console.log("frxBASKET Balance| wfrxETH:", String(wfrxETHbalance)/10**18, ' FRAX: ', String(FRAXbalance)/10**18, 'FXS: ', String(FXSbalance)/10**18);

  console.log("START REBALANCING==> wfrxETH: 0.001, FXS: 1.00, FRAX: 3.00 ", )
  const startRebalanceTrx = await generalIndex.connect(owner).startRebalance(frxBASKET.target, [], [], [1000000000000000n, 1_000000000000000000n, 3_000000000000000000n], posMultiplier  ) //0.001wfrxETH, 1 FXS, 3 FRAX
  await startRebalanceTrx.wait(2);


  const zero = "0x0000000000000000000000000000000000000000000000000000000000000000"
  console.log("Trade FXS ==> wfrxETH: 0.001, FXS: 1.00, FRAX: 3.00 ", )
  // CHECK WITH DIRECTION TO TRADE WHAT ASSET
  const tradeTrx = await generalIndex.connect(owner).trade(frxBASKET.target, FXS, zero) // Trading wBTC and expecting min amount of wETH to recieve
  await tradeTrx.wait(2);


  const wfrxETHDirection1 = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, wfrxETH.target)
  console.log("wfrxETH Direction: ",wfrxETHDirection1[0], Number(wfrxETHDirection1[1])/10**18 );

  const FRAXDirection1 = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, FRAX.target)
  console.log("FRAX Direction: ",FRAXDirection1[0], Number(FRAXDirection1[1])/10**18 );

  const FXSDirection1 = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, FXS.target)
  console.log("FXS Direction: ",FXSDirection1[0], Number(FXSDirection1[1])/10**18 );


  const wfrxETHbalance1 = await wfrxETH.balanceOf(frxBASKET.target);
  const FRAXbalance1 =  await FRAX.balanceOf(frxBASKET.target);
  const FXSbalance1 =  await FXS.balanceOf(frxBASKET.target);
  console.log("frxBASKET Balance| wfrxETH:", String(wfrxETHbalance1)/10**18, ' FRAX: ', String(FRAXbalance1)/10**18, 'FXS: ', String(FXSbalance1)/10**18);


  console.log("Trade FRAX==> wfrxETH: 0.001, FXS: 1.00, FRAX: 3.00 ", )
  // CHECK WITH DIRECTION TO TRADE WHAT ASSET
  const tradeTx2 = await generalIndex.connect(owner).trade(frxBASKET.target, FRAX, zero) // Trading wBTC and expecting min amount of wETH to recieve
  await tradeTx2.wait(2);



  const wfrxETHDirection2 = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, wfrxETH.target)
  console.log("wfrxETH Direction: ",wfrxETHDirection2[0], Number(wfrxETHDirection2[1])/10**18 );

  const FRAXDirection2 = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, FRAX.target)
  console.log("FRAX Direction: ",FRAXDirection2[0], Number(FRAXDirection2[1])/10**18 );

  const FXSDirection2 = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, FXS.target)
  console.log("FXS Direction: ",FXSDirection2[0], Number(FXSDirection2[1])/10**18 );


  const wfrxETHbalance2 = await wfrxETH.balanceOf(frxBASKET.target);
  const FRAXbalance2 =  await FRAX.balanceOf(frxBASKET.target);
  const FXSbalance2 =  await FXS.balanceOf(frxBASKET.target);
  console.log("frxBASKET Balance| wfrxETH:", String(wfrxETHbalance2)/10**18, ' FRAX: ', String(FRAXbalance2)/10**18, 'FXS: ', String(FXSbalance2)/10**18);



}



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });