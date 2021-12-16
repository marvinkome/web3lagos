import { ethers } from "hardhat";
import { saveFrontendFiles } from "./helpers";

async function main() {
  const baseURI = "https://www.web3lagos.org/nft.json";
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Web3Lagos = await ethers.getContractFactory("Web3Lagos");
  const web3NFT = await Web3Lagos.deploy(baseURI);

  console.log("Contract address:", web3NFT.address);

  // transfer ownership
  const tx = await web3NFT.connect(deployer).transferOwnership("0x3a1e9e54f4d708e3acbdb2cfaa3ec94f34b9b02e");
  await tx.wait();

  const owner = await web3NFT.owner();
  console.log("Contract owner:", owner);

  // save frontend files
  saveFrontendFiles(web3NFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
