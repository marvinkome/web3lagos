import { ethers } from "hardhat";

async function main() {
  const baseURI = "https://www.web3lagos.org/nft.json";
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Web3Lagos = await ethers.getContractFactory("Web3Lagos");
  const web3NFT = await Web3Lagos.deploy(baseURI);

  console.log("Token address:", web3NFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
