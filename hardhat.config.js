require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
const AURORA_PRIVATE_KEY = process.env.AURORA_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  optimizer: true,
  networks: {
    hardhat: {
      chainId: 31337,
    },
    testnet_aurora: {
      url: "https://testnet.aurora.dev",
      accounts: [`0x${AURORA_PRIVATE_KEY}`],
    },
  },
};
