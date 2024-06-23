// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.


// PHASE 1
// Get Required THINGS
// 3 wallets to impersonate
// All Frax token contract address


// PHASE 2
// DEPLOY CONTROLLER
// DEPLOY BIM MODULE
// INIT CONTROLLER
// DEPLOY BLUE CHIP SET TOKEN
// ADD BLUE CHIP SET TO CONTROLLER
// INIT BIM
// DELEGATE USDT/ WETH/ WBTC TO BIM
// TESTING UNITS AND COMPONENTS


// PHASE 3
// ISSUE BLUE CHIP SET TOKEN
// ISSUE BLUE CHIP SET TOKEN FOR OTHER ACCOUNTS
// CHECK UPDATED BALANCES
// CHECK BLUE CHIP SET TOKEN CONTRACT BALANCE


// frxETH - NA
// wfrxETH - yes
// sfrxETH - NA
// FXS - Frax share - yes
// FRAX - stablecoin - maybe
// sFRAX - staked FRAX - NA
// frxBTC - maybe - not on testnet
// FPI - frax price index - maybe
// FPIS - 


// RedStone Oracle
// BTC
// ETH - $3500 (0.001)
// CRV 
// FRAX - $1  (3)
// FXS - $3  (1)

// dAPI (paid)
// FXS/USD
// sFRAX/ FRAX
// sfrxETH/ frxETH

// Final Components
// wfrxETH - 0.001
// FRAX - 3
// FXS - 1







const hre = require("hardhat");
const {toBeHex, zeroPadValue} = require('ethers')


// FRAX MAINNET CONTRACTS AND ADDRESSES
// (https://www.geckoterminal.com/fraxtal/pools)
// USDT - 0x4d15EA9C2573ADDAeD814e48C148b5262694646A
// wBTC - 0x7F3a9Afc827AeEdb0c5dC1A66C0Baa41cD7289F0


// FOR PRICE ORACLE
const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]


async function main() {

  //--------------------------------------------------------------------------------------------//
  // PHASE 1: Impersonate Addresses and setup ERC20 contract instances
  //--------------------------------------------------------------------------------------------//
  console.log("Starting Deployment Script")

  // Impersonate high networth wallets
  let accounts = [];
  accounts[0] = await ethers.getImpersonatedSigner("0xCAc0Eb798903FFE73aB1776da3174E6E40e721c6");
  accounts[1] = await ethers.getImpersonatedSigner("0xB2987147A93afb3aC2E49727a3F49E663BF95273");
  accounts[2] = await ethers.getImpersonatedSigner("0xE0430C83f34B4d722636Ec1988412F756B1CEE4d");
  accounts[3] = await ethers.getImpersonatedSigner("0xAAc0aa431c237C2C0B5f041c8e59B3f1a43aC78F");
  accounts[4] = await ethers.getImpersonatedSigner("0xdc519874071Cca5457fdF8b3c31760ac1CA16Ef7");

  // setting owner
  const owner = accounts[0];
  console.log("OWNER ADDRESS: ", owner.address)


  const wfrxETH = await hre.ethers.getContractAt('ERC20', '0xFC00000000000000000000000000000000000006')
  // const sfrxETH = await hre.ethers.getContractAt('ERC20', '0xFC00000000000000000000000000000000000005');
  const FXS = await hre.ethers.getContractAt('ERC20', '0xFC00000000000000000000000000000000000002')
  // const FPI = await hre.ethers.getContractAt('ERC20', '0xFC00000000000000000000000000000000000003')
  const FRAX = await hre.ethers.getContractAt('ERC20', '0xFc00000000000000000000000000000000000001');
  const USDT = await hre.ethers.getContractAt('ERC20', '0x4d15EA9C2573ADDAeD814e48C148b5262694646A');
  
  console.log("RETRIEVED USDT Address from INSTANCE: ", USDT.target);


  //Transfer some tokens to test script
  await wfrxETH.connect(accounts[1]).transfer(accounts[0], 40000000000000000000n)
  await wfrxETH.connect(accounts[1]).transfer(accounts[2], 40000000000000000000n)
  // await sfrxETH.connect(accounts[3]).transfer(accounts[0], 100_000000000000000000n)
  // await sfrxETH.connect(accounts[3]).transfer(accounts[1], 100_000000000000000000n)
  // await sfrxETH.connect(accounts[3]).transfer(accounts[2], 100_000000000000000000n)
  await accounts[2].sendTransaction({
    to: owner,
    value: 1000000000000000000n
  })
  await accounts[3].sendTransaction({
    to: accounts[4],
    value: 1_000000000000000000n
  })
  await FXS.connect(accounts[4]).transfer(accounts[0], 200_000000000000000000n)
  await FXS.connect(accounts[4]).transfer(accounts[1], 200_000000000000000000n)
  await FXS.connect(accounts[4]).transfer(accounts[2], 200_000000000000000000n)


  for (const account of accounts) {
    const balance = await hre.ethers.provider.getBalance(account); 
    const balancewfrxETH = await wfrxETH.balanceOf(account);
    //const balancesfrxETH = await sfrxETH.balanceOf(account);
    const balanceFXS = await FXS.balanceOf(account);
    //const balanceFPI = await FPI.balanceOf(account);
    const balanceFRAX = await FRAX.balanceOf(account);
    console.log(account.address, ' frxETH: ',  String(balance)/10**18,' wfrxETH: ', String(balancewfrxETH)/10**18,  ' FXS: ', String(balanceFXS)/10**18, " FRAX: ", String(balanceFRAX)/10**18);
  }

  //--------------------------------------------------------------------------------------------//
  // PHASE 2: Deploy Base System Contracts: Controller, setToken, BasicIssue Module
  //--------------------------------------------------------------------------------------------//

  // Deploy Controller
  const controller = await ethers.deployContract("Controller", [owner.address], owner);
  console.log("Controller Contract:", controller.target)


  // Deploy BIM Module
  const basicIssueModule = await ethers.deployContract("BasicIssuanceModule", [controller.target], owner);  
  console.log("Basic Issue Module Contract:", basicIssueModule.target)  
  
  // initialize controller
  await controller.connect(owner).initialize([owner.address], [basicIssueModule.target], [], [] );

  // Deploy Set Token (Blue Chip - wETH, wBTC)
  const frxBASKET = await ethers.deployContract("SetToken", [[wfrxETH.target,  FXS.target, FRAX.target], [1000000000000000n, 1_000000000000000000n, 3_000000000000000000n], [basicIssueModule.target], controller.target ,owner, "FRAX BASKET", "FRXB"], owner); // 0.001 frxWETH, 1 FXB, 3 FRAX

  console.log("FRAX BASKET Token Contract:", frxBASKET.target)


  // Add Set to Controller Contract
  await controller.connect(owner).addSet(frxBASKET.target);

  // Initialize BIM Module
  await basicIssueModule.connect(owner).initialize(frxBASKET.target, '0x0000000000000000000000000000000000000000');


  //--------------------------------------------------------------------------------------------//
  // PHASE 3: Issue FRAX Basket set token using BIM module
  //--------------------------------------------------------------------------------------------//


  // Delegate wETH/wBTC allowance to BIM
  for (let index = 0; index < accounts.length; index++) {
    await wfrxETH.connect(accounts[index]).approve(basicIssueModule.target, 20_000000000000000000n);
    //await sfrxETH.connect(accounts[index]).approve(basicIssueModule.target, 20_000000000000000000n); 
    await FXS.connect(accounts[index]).approve(basicIssueModule.target, 20_000000000000000000n);
    //await FPI.connect(accounts[index]).approve(basicIssueModule.target, 20_000000000000000000n); 
    await FRAX.connect(accounts[index]).approve(basicIssueModule.target, 20_000000000000000000n);
  }

  // Testing Components and Units in Set Token
  const result = await basicIssueModule.getRequiredComponentUnitsForIssue(frxBASKET.target, 1_000000000000000000n);
  console.log("AMOUNT OF COMPONENTS REQUIRED TO MINT 1 FRAX BASKET TOKEN: ", result)
  const components = await frxBASKET.getComponents();
  console.log("DEFAULT COMPONENT POSITION")
  for(const component of components){
    const defaultPos = await frxBASKET.getDefaultPositionRealUnit(component);
    const realUnit = await frxBASKET.getTotalComponentRealUnits(component);
    console.log("component: ", component, " Default position: ", defaultPos, " total comp real unit: ", realUnit); 
  }

  const posMultiplier = await frxBASKET.positionMultiplier();
  console.log("POSITION MULTIPLIER: ", posMultiplier);

  // const positions = await frxBASKET.getPositions();
  // console.log("POSITIONS: ", positions);


  // Check Allowance
  // const fxsallowance = await FXS.allowance(owner.address, basicIssueModule.target);
  // console.log("FXS Allowance by owner to BIM: ", fxsallowance)

  // Issue BLUE CHIP tokens
  const tokenSupply = await frxBASKET.totalSupply();
  console.log('Token Supply:', tokenSupply);
  await basicIssueModule.connect(accounts[0]).issue(frxBASKET.target, 1_250000000000000000n, accounts[0].address)


  // Issue BLUE CHIP for other accounts
  // await basicIssueModule.connect(accounts[1]).issue(frxBASKET.target, 2423000000000000000n, accounts[1].address);
  await basicIssueModule.connect(accounts[2]).issue(frxBASKET.target, 2_330000000000000000n, accounts[2].address);

  // Check Updated token supply
  const newTokenSupply = await frxBASKET.totalSupply();
  console.log("New Updated Token Supply:", String(newTokenSupply)/10**18);
  
  // Print Account Balances
  for (const account of accounts) {
    const balancebasket = await frxBASKET.balanceOf(account);
    console.log(account.address, 'FRAX BASKET BALANCE: ', String(balancebasket)/10**8);
  }

  // Check BLUE Token Contract Balance
  const fBASKETwfrxETHbalance = await wfrxETH.balanceOf(frxBASKET.target);
  //const BLUEsfrxETHbalance =  await sfrxETH.balanceOf(frxBASKET.target);
  const fBASKETFXSbalance = await FXS.balanceOf(frxBASKET.target);
  // const BLUEFPIbalance =  await FPI.balanceOf(frxBASKET.target);
  const fBASKETFRAXbalance = await FRAX.balanceOf(frxBASKET.target)
  console.log("FRAX Contract Balance| wfrxETH:", String(fBASKETwfrxETHbalance)/10**18, ' FXS: ', String(fBASKETFXSbalance)/10**18,  ' FRAX: ', String(fBASKETFRAXbalance)/10**18);


  //--------------------------------------------------------------------------------------------//
  // PHASE 4: Deploy Price Oracle Contract 
  //--------------------------------------------------------------------------------------------//
  // Testing Oracle
  const oracleContract = await hre.ethers.getContractAt(aggregatorV3InterfaceABI, '0x89e60b56efD70a1D4FBBaE947bC33cae41e37A72')
  const ethusdprice = await oracleContract.latestRoundData();
  console.log("ETH USD Price: ", ethusdprice)


  // Deploy price Oracel System Contract
  const priceOracle = await hre.ethers.deployContract("PriceOracle", [controller.target, USDT.target, [], [wfrxETH.target, FXS.target, FRAX.target], [USDT.target, USDT.target, USDT.target],   ['0x89e60b56efD70a1D4FBBaE947bC33cae41e37A72', '0xbf228a9131AB3BB8ca8C7a4Ad574932253D99Cd1', '0xa41107f9259bB835275eaCaAd8048307B80D7c00'] ], owner)
  console.log("Price Oracle: ", priceOracle.target);

  // Adding price Oracle to controller as Resource
  controller.connect(owner).addResource(priceOracle.target, 1);

  // Get Prices
  const wfrxETHprice = await priceOracle.connect(accounts[0]).getPrice(wfrxETH.target, USDT.target);
  console.log("wfrxETH / USDT:" , String(wfrxETHprice)/10**8);

  const fxsprice = await priceOracle.connect(accounts[0]).getPrice(FXS.target, USDT.target);
  console.log("FRX/ USDT: ", String(fxsprice)/10**8)

  const fraxprice = await priceOracle.connect(accounts[0]).getPrice(FRAX.target, USDT.target);
  console.log("FRAX/ USDT: ", String(fraxprice)/10**8)


  //--------------------------------------------------------------------------------------------//
  // PHASE 5: Deploy Set Valuer to value BLUE CHIP based on holdings
  //--------------------------------------------------------------------------------------------//

  // DEPLOY SET VALUER
  const setValuer = await ethers.deployContract("SetValuer", [controller.target]);
  
  // Adding set Valuer to controller as module
  // SET VALUER MUST BE RESOURCE WITH ID - 2
  await controller.connect(owner).addResource(setValuer.target, 2);

  const checkSystemContract = await controller.isSystemContract(setValuer.target);
  console.log("Check if Set Valuer is system contract: ", checkSystemContract );

  // Fetch Valuation of Set Token (BLUE CHIP) in USDT
  const setValuation  = await setValuer.calculateSetTokenValuation(frxBASKET.target, USDT.target);
  console.log("FRAX BASKET Set token Valuation 🙏: $", String(setValuation)/10**8);


  //--------------------------------------------------------------------------------------------//
  // PHASE 6: Deploy Net Asset Value Issuance Module
  //--------------------------------------------------------------------------------------------//

  // Deploy NAV Issuance Module
  const NAVModule = await ethers.deployContract("CustomOracleNavIssuanceModule", [controller.target, wfrxETH]);

  // Add NAV to Controller as module
  await controller.connect(owner).addModule(NAVModule.target);
  // Add NAV to SetToken as module
  await frxBASKET.connect(owner).addModule(NAVModule.target);



  let navIssuanceSettings = {
    managerIssuanceHook: '0x0000000000000000000000000000000000000000',
    managerRedemptionHook: '0x0000000000000000000000000000000000000000',
    setValuer: setValuer.target,
    reserveAssets: [wfrxETH.target, FXS.target],
    feeRecipient: accounts[0],
    managerFees: [0, 0],
    maxManagerFee: 500000000000000n,
    premiumPercentage: 100000000000000n,
    maxPremiumPercentage: 500000000000000n,
    minSetTokenSupply: 10000000000000000n //0.1
  }

  // INITIALIZE NAV Module with NAV ISSUEANCE SETTINGS
  console.log("transaction initiated ... ")
  await NAVModule.connect(owner).initialize(frxBASKET.target, navIssuanceSettings)


  // Checking if NAV module is system contract
  const checkSystemContractNAV = await controller.isSystemContract(NAVModule.target);
  console.log("Check if NAV Module is system contract: ", checkSystemContractNAV );

  //--------------------------------------------------------------------------------------------//
  // PHASE 7: Issue FRAX BASKET set token using NAV module
  //-------------------------------------------------------------------------------------------//


  await wfrxETH.connect(owner).approve(NAVModule.target, 20_000000000000000000n);
  await FXS.connect(owner).approve(NAVModule.target, 20_000000000000000000n);
  await FRAX.connect(owner).approve(NAVModule.target, 20_000000000000000000n);

  // Check Issuance is valid using: isIssueValid and getExpectedSetTokenIssueQuantity
  const boolResult = await NAVModule.isIssueValid(frxBASKET.target, FXS.target, 3_000000000000000000n);
  console.log("Is it valid to buy FRAX BASKET with  FXS: ", boolResult);

  // Check Issuance is valid using: getExpectedSetTokenIssueQuantity
  const expectedIssuance = await NAVModule.getExpectedSetTokenIssueQuantity(frxBASKET.target, FXS.target, 3_000000000000000000n);
  console.log("Expected output of frxBASKET for 3 FXS: ", String(expectedIssuance)/10**18);


  // Issue Set Token using NAV MODULE
  await NAVModule.connect(accounts[0]).issue(frxBASKET.target, FXS.target, 3_000000000000000000n, 0 , accounts[0].address ) // Mint for 3 FRAX
  
  // Checking FRAX BASKET BALANCE after minting new tokens
  const afterNAVTokenSupply = await frxBASKET.totalSupply();
  console.log("DID NAV Module incresed Token Supply:", String(afterNAVTokenSupply)/10**18);


  const newBASKETwfrxETHbalance = await wfrxETH.balanceOf(frxBASKET.target);
  //const newBLUEsfrxETHbalance =  await sfrxETH.balanceOf(frxBASKET.target);
  const newBASKETFXSbalance = await FXS.balanceOf(frxBASKET.target);
  //const newBLUEFPIbalance =  await FPI.balanceOf(frxBASKET.target);
  const newBASKETFRAXbalance = await FRAX.balanceOf(frxBASKET.target)
  console.log("FRAX Contract Balance| wfrxETH:", String(newBASKETwfrxETHbalance)/10**18, ' FXS: ', String(newBASKETFXSbalance)/10**18,  ' FRAX: ', String(newBASKETFRAXbalance)/10**18);



    //--------------------------------------------------------------------------------------------//
  // PHASE 8: Deploy Integration Registry
  //--------------------------------------------------------------------------------------------//


  // Deploy Integration Registry
  const integrationRegistry = await hre.ethers.deployContract("IntegrationRegistry", [controller.target], owner);

  // Add Integration Registry to Controller
  await controller.connect(owner).addResource(integrationRegistry.target, 0);

  // Check if IR is System Contract
  const checkSystemContractIR = await controller.isSystemContract(integrationRegistry.target);
  console.log("Check if Integration Registry is system contract: ", checkSystemContractIR );

  //--------------------------------------------------------------------------------------------//
  // PHASE 9: Deploy GIM and set Parameters
  //--------------------------------------------------------------------------------------------//

  // Deploy General Index Module
  const generalIndex = await ethers.deployContract("GeneralIndexModule", [controller.target, wfrxETH], owner);
  
  // Add module to Controller
  await controller.connect(owner).addModule(generalIndex.target);
  // Add module to Set Token
  await frxBASKET.connect(owner).addModule(generalIndex.target);

  // Initialize Module
  await generalIndex.connect(owner).initialize(frxBASKET.target);
  const indexModuleState = await frxBASKET.isInitializedModule(generalIndex.target);

  console.log("General Index Module Initialised : ", indexModuleState);

  // Check if GIM is system contract
  const checkSystemContractGIM = await controller.isSystemContract(generalIndex.target);
  console.log("Check if General Index Module is system contract: ", checkSystemContractGIM );

  
  // params: max Trade Size, coolOffPeriod, exchange to trade
  console.log("Allowed Traders Original: ",await generalIndex.connect(owner).getAllowedTraders(frxBASKET.target));
  await generalIndex.connect(owner).setAnyoneTrade(frxBASKET.target, true);
  console.log("Allowed Traders Now: ",await generalIndex.connect(owner).getAllowedTraders(frxBASKET.target));


  // Config Trade Maximums for Components
  // @params: setToken, components, maximums
  await generalIndex.connect(owner).setTradeMaximums(frxBASKET.target, [wfrxETH, FRAX, FXS], [5_000000000000000000n, 50_000000000000000000n, 10_000000000000000000n]) //5frxETH, 50FRAX, 10FXS
  // 126713633106296360000n
  // 130000000000000000000n
  // Config Cool Off Period
  // @params: set, components[], uint256[] cooloffperiod
  await generalIndex.connect(owner).setCoolOffPeriods(frxBASKET.target, [wfrxETH, FRAX, FXS], [1, 1, 1])
  



  //--------------------------------------------------------------------------------------------//
  // PHASE 10: Deploy Exchange Adapters config in system contracts
  //--------------------------------------------------------------------------------------------//

  // Adapter 
  // 0x39cd4db6460d8B5961F73E997E86DdbB7Ca4D5F6 - Frax Swap Router


  // Deploy Exchange Adapters
  const fraxswapIndexExchangeAdapter =  await hre.ethers.deployContract("UniswapV2IndexExchangeAdapter", ['0x39cd4db6460d8B5961F73E997E86DdbB7Ca4D5F6'], owner);
  const router = await fraxswapIndexExchangeAdapter.getSpender();
  console.log("FraxSwap Router Spender: ", router);

  // Add Adaptors for trading in IR - single integration
  await integrationRegistry.connect(owner).addIntegration(generalIndex.target, "FraxSwapRouter", fraxswapIndexExchangeAdapter);


  // Retrieve Integration Registry
  const fraxswapAdapter = await integrationRegistry.connect(owner).getIntegrationAdapter(generalIndex.target, "FraxSwapRouter");
  console.log("Retrieved Fraxswap Adapter: ", fraxswapAdapter);


  // Config Exchanges
  // @params: setToken, components[], exchangeNames[]
  await generalIndex.connect(owner).setExchanges(frxBASKET.target, [wfrxETH.target, FRAX.target, FXS.target], ["FraxSwapRouter", "FraxSwapRouter", "FraxSwapRouter"])
  // @params: setToken, compoenents[],bytes[] exchangeData
  const uniBytes = "0x";
  const wbtcBytes = "0x7890";
  const uniswapData = zeroPadValue(toBeHex(3000), 3)
  // await generalIndex.connect(owner).setExchangeData(frxBASKET.target, [wfrxETH.target, FRAX.target, FXS.target], [])


  //--------------------------------------------------------------------------------------------//
  // PHASE 11: Start Rebalance Process
  //--------------------------------------------------------------------------------------------//

  
  const newMultiplier = await frxBASKET.positionMultiplier();
  console.log("POSITION MULTIPLIER: ", newMultiplier);

  await generalIndex.connect(owner).startRebalance(frxBASKET.target, [], [], [1000000000000000n, 1_000000000000000000n, 3_000000000000000000n], newMultiplier  ) //0.001wfrxETH, 1 FXS, 3 FRAX
  console.log("Target Balance Units==> wfrxETH: 0.001, FXS: 1.00, FRAX: 3.00 ", )


  const wfrxETHDirection = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, wfrxETH.target)
  console.log("wfrxETH Direction: ",wfrxETHDirection[0], Number(wfrxETHDirection[1])/10**18 );

  const FRAXDirection = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, FRAX.target)
  console.log("FRAX Direction: ",FRAXDirection[0], Number(FRAXDirection[1])/10**18 );

  const FXSDirection = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, FXS.target)
  console.log("FXS Direction: ",FXSDirection[0], Number(FXSDirection[1])/10**18 );

  

  const zero = "0x0000000000000000000000000000000000000000000000000000000000000000"
  const maxuint256 = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  // settoken, component, _ethQuantityLimit -> Max/min amount of ETH spent/received during trade
  // await generalIndex.initialize(blueChip.target);
 

  const tradeTrx = await generalIndex.connect(owner).trade(frxBASKET.target, FXS, zero) // Trading wBTC and expecting min amount of wETH to recieve
  // console.log("1st Trade Transaction :", tradeTrx)



  const after2BLUEwfrxETHbalance = await wfrxETH.balanceOf(frxBASKET.target);
  const after2BLUEFRAXbalance =  await FRAX.balanceOf(frxBASKET.target);
  const after2BLUEFXSbalance =  await FXS.balanceOf(frxBASKET.target);
  console.log("frxBASKET Balance| wfrxETH:", String(after2BLUEwfrxETHbalance)/10**18, ' FRAX: ', String(after2BLUEFRAXbalance)/10**18, 'FXS: ', String(after2BLUEFXSbalance)/10**18);

  // await generalIndex.connect(owner).trade(frxBASKET.target, wfrxETH, maxuint256) // Trading wBTC and expecting min amount of wETH to recieve

  // const after3BLUEwfrxETHbalance = await wfrxETH.balanceOf(frxBASKET.target);
  // const after3BLUEFRAXbalance =  await FRAX.balanceOf(frxBASKET.target);
  // const after3BLUEFXSbalance =  await FXS.balanceOf(frxBASKET.target);
  // console.log("frxBASKET Balance| wfrxETH:", String(after3BLUEwfrxETHbalance)/10**18, ' FRAX: ', String(after3BLUEFRAXbalance)/10**18, 'FXS: ', String(after3BLUEFXSbalance)/10**18);

 
  
  const wfrxETHDirection2 = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, wfrxETH.target)
  console.log("wfrxETH Direction: ",wfrxETHDirection2[0], Number(wfrxETHDirection2[1]) );

  const FRAXDirection2 = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, FRAX.target)
  console.log("FRAX Direction: ",FRAXDirection2[0], Number(FRAXDirection2[1])/10**18 );

  const FXSDirection2 = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(frxBASKET.target, FXS.target)
  console.log("FXS Direction: ",FXSDirection2[0], Number(FXSDirection2[1]) );

  try {
    
    console.log("AGAIN REBALANCING Target Balance Units==> wfrxETH: 0.001, FXS: 1.00, FRAX: 3.00 ", )
    const tradeTx2 = await generalIndex.connect(owner).trade(frxBASKET.target, FRAX, wfrxETHDirection2[1]) // Trading wBTC and expecting min amount of wETH to recieve
    // console.log("2nd Trade Transaction :", tradeTx2)
    
    
  } catch (error) {
    console.log("ERROR Transaction 2: ", error)
  }
  


  const afterBLUEwfrxETHbalance = await wfrxETH.balanceOf(frxBASKET.target);
  const afterBLUEFRAXbalance =  await FRAX.balanceOf(frxBASKET.target);
  const afterBLUEFXSbalance =  await FXS.balanceOf(frxBASKET.target);
  console.log("frxBASKET Balance| wfrxETH:", String(afterBLUEwfrxETHbalance)/10**18, ' FRAX: ', String(afterBLUEFRAXbalance)/10**18, 'FXS: ', String(afterBLUEFXSbalance)/10**18);





  //--------------------------------------------------------------------------------------------//
  // END OF PROGRAM
  //--------------------------------------------------------------------------------------------//

}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

