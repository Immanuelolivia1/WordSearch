// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
//vrfCoordinatorFamtom = 0x7a1bac17ccc5b313516c5e16fb24f7659aa5ebed
//keyhash = 0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f
// gameSecretKey = BlockHeaderio1
const hre = require("hardhat");
require("dotenv").config();

const PERCENT = 1;
const REWARD_AMOUNT = 1;
const gameSecretKey = ethers.utils.formatBytes32String(
  process.env.GAME_SECRET_KEY
);

const VRF_COORDINATOR_ADDRESS = process.env.MUMBAI_VRF_COORDINATOR;
const KEYHASH = process.env.MUMBAI_KEY_HASH;
const SUBSCRIPTION_ID = process.env.SUBSCRIPTION_ID;

async function main() {
  const StakingToken = await ethers.getContractFactory("TLCToken");
  const stakingToken = await StakingToken.deploy();
  console.log(
    "STAKING TOKEN HAS BEEN DEPLOYED TO ________",
    stakingToken.address
  );

  const StakingContract = await ethers.getContractFactory("Staking");
  const stakingContract = await StakingContract.deploy(stakingToken.address);
  console.log(
    "STAKING CONTRACT HAS BEEN DEPLOYED TO ________",
    stakingContract.address
  );

  const GameContract = await ethers.getContractFactory("GameContract");
  const gameContract = await GameContract.deploy(
    PERCENT,
    REWARD_AMOUNT,
    stakingToken.address,
    stakingContract.address,
    gameSecretKey
  );
  console.log(
    "GAME CONTRACT HAS BEEN DEPLOYED TO ________",
    gameContract.address
  );

  //we also want to give the game contract 95% of the token
  const send95PercentTo = await stakingToken.send95PercentTo(
    gameContract.address
  );
  console.log(
    "SUCCESSFULLY SENT 95 PERCENT , TXN HASH IS _____",
    send95PercentTo.hash
  );

  //optional : deployssss , deploy mock coordinator

  // const VrfCoordinatorV2Mock = await ethers.getContractFactory(
  //   "VRFCoordinatorV2Mock"
  // );
  // const vrfCoordinatorV2Mock = await VrfCoordinatorV2Mock.deploy(
  //   BASE_FEE,
  //   GAS_PRICE_LINK
  // );
  // //CREATE SUBSCRIPTION HERE
  // const transactionResponse = await vrfCoordinatorV2Mock.createSubscription();
  // const transactionReceipt = await transactionResponse.wait(1);
  // const subscriptionId = transactionReceipt.events[0].args.subId;

  // console.log("SuBSCription ID is __---", subscriptionId);

  // await vrfCoordinatorV2Mock.fundSubscription(
  //   subscriptionId,
  //   VRF_SUB_FUND_AMOUNT
  // );

  const VRFD20Contract = await ethers.getContractFactory("VRFD20");
  const vrfd20Contract = await VRFD20Contract.deploy(
    SUBSCRIPTION_ID,
    gameSecretKey,
    VRF_COORDINATOR_ADDRESS,
    KEYHASH
  );

  console.log(
    "vrfd20Contract was successfully deployed to _______",
    vrfd20Contract.address
  );

  // await vrfCoordinatorV2Mock.addConsumer(
  //   subscriptionId,
  //   vrfd20Contract.address
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// STAKING TOKEN HAS BEEN DEPLOYED TO ________ 0xca21AE6e2CeF60bb28B57c82F554186E99fcC899
// STAKING CONTRACT HAS BEEN DEPLOYED TO ________ 0x1408736Ae182122f968f00034589Ef3f4becA64c
// GAME CONTRACT HAS BEEN DEPLOYED TO ________ 0x4456FABB67cC2d4a60e0505F9D4eaEf3Ec09EC60
// SUCCESSFULLY SENT 95 PERCENT , TXN HASH IS _____ 0x02fcab6a18471948a22c92590bd49882b9b7a086e855c80ab74a14ec7fe6e438
// vrfd20Contract was successfully deployed to _______ 0xb6Af31C26e770454f73D14f3aF87990FCC3f4c48