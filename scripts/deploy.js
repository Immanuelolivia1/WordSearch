// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");
require("dotenv").config();

const PERCENT = 1;
const REWARD_AMOUNT = 1;
const gameSecretKey = ethers.utils.formatBytes32String(
  process.env.GAME_SECRET_KEY
);

const ORACLE_ADDRESS = process.env.ORACLE_ADDRESS;

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

  const FetchRandomWordsContract = await ethers.getContractFactory(
    "FetchRandomWords"
  );
  const fetchRandomWordsContract = await FetchRandomWordsContract.deploy(
    ORACLE_ADDRESS,
    gameSecretKey
  );

  console.log(
    "FetchRandomWords was successfully deployed to _______",
    fetchRandomWordsContract.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
