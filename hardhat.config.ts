require("dotenv").config({ path: ".env.local" });
import { HardhatUserConfig } from "hardhat/types";

import "./ethereum/tasks/deploy-test";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.0",
  },
  networks: {
    rinkeby: {
      url: process.env.INFURA_RINKEBY,
      accounts: {
        mnemonic: process.env.mnemonic || "",
      },
    },
    polygon: {
      url: process.env.INFURA_POLYGON,
      accounts: {
        mnemonic: process.env.mnemonic || "",
      },
    },
    mumbai: {
      url: process.env.INFURA_MUMBAI,
      accounts: {
        mnemonic: process.env.mnemonic || "",
      },
    },
  },
  paths: {
    root: "./ethereum",
    sources: "./contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
