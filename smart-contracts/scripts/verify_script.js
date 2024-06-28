const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();

  const owner = accounts[0];

  const manager = "0xF12703c0c4B00964D0d3117B236197f79e1bbfA2"
  const index = "0xC8B1d9A663eFcd38b1CE6712078176558063e7bC"
  const controller = "0x36a7a778DF69B6888045a708624477CAb45d0B96"
  const issue = "0x80884b6690fd795aDB9D132Bc38b4184663EC72b"
  const oracle = "0xf2402903F7106e8a403838a18787882aA5a802f5";

  const setvaluer = "0xCEDB9A8f969E075E2D0aA3280D13cEDAed2bE5A9";
  const navissue = "0xd4B973F5b0ef988832C640c4DBA59AA16E2D7e47";
  const integration = "0x0ef0AFaF3E487Cd5c9AC845D6d4890e5e3439b0f";
  const generalindex = "0xdB4c154797086Dcb89e862520ca3d688d39829EF";
  const fraxswapadapter = "0xb277e63a2b11029722E07C74aECFbb2Eed242CE0";
   
  const wfrxETH = '0xFC00000000000000000000000000000000000006';
  const frax = '0xFC00000000000000000000000000000000000001';
  const fxs = '0xFC00000000000000000000000000000000000002';
  const USDT = '0x4d15EA9C2573ADDAeD814e48C148b5262694646A';

  // const ETH = "0xE98F36e22e4e13a123f325e1B52108765e133eAe";
  // const BTC = "0xA49e29D2E987651b7C9476206EA423e7F058Ff65";
  // const Controller = "0x346F7bDb9552BE08501248059f739F9542AEA37A";
  // const BIM = "0xa9bF2f88990F3693a7c7fdE35DA1aA9dd309CDdd";
  // const BLUE = "0x33d00051ABd6D46E710adeaa321985e8eba1960f";

  // const verifyController = await run("verify:verify", {
  //   address: controller,
  //   constructorArguments: [
  //     manager
  //   ],
  // });

  // console.log("Verifying Controller code: ", verifyController)

  // const verifyIssue = await run("verify:verify", {
  //   address: issue,
  //   constructorArguments: [
  //     controller
  //   ],
  // });

  // const verifyIndex = await run("verify:verify", {
  //   address: index,
  //   constructorArguments: [
  //     [wfrxETH, fxs, frax], 
  //     [1000000000000000n, 1_000000000000000000n, 3_000000000000000000n], 
  //     [issue], 
  //     controller ,
  //     manager, 
  //     "FRAX BASKET", 
  //     "FRXB"
  //   ]
  // });

  // [[wfrxETH.target,  FXS.target, FRAX.target], [1000000000000000n, 1_000000000000000000n, 3_000000000000000000n], [basicIssueModule.target], controller.target ,owner, "FRAX BASKET", "FRXB"]
  
  // const verifyOracle = await run("verify:verify", {
  //   address: oracle,
  //   constructorArguments: [
  //     controller, 
  //     USDT, 
  //     [], 
  //     [wfrxETH, fxs, frax], 
  //     [USDT, USDT, USDT],   
  //     ['0x89e60b56efD70a1D4FBBaE947bC33cae41e37A72', '0xbf228a9131AB3BB8ca8C7a4Ad574932253D99Cd1', '0xa41107f9259bB835275eaCaAd8048307B80D7c00']
  //   ],
  // });

  // const verifyValuer = await run("verify:verify", {
  //   address: setvaluer,
  //   constructorArguments: [
  //     controller
  //   ]
  // })

  // const verifyNavIssue = await run("verify:verify", {
  //   address: navissue,
  //   constructorArguments: [
  //     controller,
  //     wfrxETH
  //   ]
  // })
  
  // const verifyIntegration = await run("verify:verify", {
  //   address: integration,
  //   constructorArguments: [
  //     controller
  //   ]
  // })


  const verifyGeneralIndex = await run("verify:verify", {
    address: generalindex,
    constructorArguments: [
      controller,
      wfrxETH
    ]
  })


  // const verifyAdapter = await run("verify:verify", {
  //   address: fraxswapadapter,
  //   constructorArguments: [
  //     '0x39cd4db6460d8B5961F73E997E86DdbB7Ca4D5F6'
  //   ]
  // })





}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
