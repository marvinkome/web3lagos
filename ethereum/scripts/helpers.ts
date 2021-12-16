import fs from "fs";
import { artifacts } from "hardhat";

export function saveFrontendFiles(address: string) {
  const contractsDir = __dirname + "/../../abi";
  if (!fs.existsSync(contractsDir)) fs.mkdirSync(contractsDir);

  const { abi } = artifacts.readArtifactSync("Web3Lagos");

  fs.writeFileSync(contractsDir + "/Web3Lagos.json", JSON.stringify(abi, null, 2));
  fs.writeFileSync(contractsDir + "/address.json", JSON.stringify({ nftAddress: address }, undefined, 2));
}
