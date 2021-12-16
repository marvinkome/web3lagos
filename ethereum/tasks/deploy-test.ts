import { task } from "hardhat/config";

task("deploy-test", "Verify contract deployment works properly")
  .addPositionalParam("contract", "The contract address")
  .setAction(async ({ contract }, hre) => {
    if (hre.network.name === "hardhat") {
      console.warn(
        "You are running the faucet task with Hardhat network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }

    const nft = await hre.ethers.getContractAt("Web3Lagos", contract);

    // console.log("Contract Owner", await nft.owner());
    console.log("Contract Total Mint", (await nft.totalMint()).toString());
  });
