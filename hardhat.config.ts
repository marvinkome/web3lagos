require("dotenv").config({ path: ".env.local" });
import { HardhatUserConfig } from "hardhat/types";

// import "./ethereum/tasks/faucet";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.0",
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
