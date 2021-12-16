import { expect } from "./setup";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";

describe("Web3Lagos", () => {
  const baseURI = "http://localhost:3000/nft.json";

  let account1: Signer;
  let account2: Signer;
  let account3: Signer;

  let Web3Lagos: Contract;

  before(async () => {
    [account1, account2, account3] = await ethers.getSigners();
  });

  beforeEach(async () => {
    Web3Lagos = await (await ethers.getContractFactory("Web3Lagos")).connect(account1).deploy(baseURI);

    await Web3Lagos.deployTransaction.wait();
  });

  it("deploys contract", async () => {
    expect(Web3Lagos.address).to.exist;
  });

  it("only owner can mint", async () => {
    const addr = await account2.getAddress();
    const tx = Web3Lagos.connect(account2).mint(addr, 1);

    // @ts-ignore
    await expect(tx).to.be.rejected;
  });

  it("owner can mint", async () => {
    const acc2Addr = await account2.getAddress();

    // initial balance of account2
    const initBalanceOfAcc2 = await Web3Lagos.balanceOf(acc2Addr);
    expect(initBalanceOfAcc2.toString()).to.be.eq("0");

    // mint token
    const tx = await Web3Lagos.connect(account1).mint(acc2Addr);
    await tx.wait();

    // check balance of account2
    const newBalanceOfAcc2 = await Web3Lagos.balanceOf(acc2Addr);
    expect(newBalanceOfAcc2.toString()).to.be.eq("1");
  });

  it("owner can mint to multiple accounts", async () => {
    const acc2Addr = await account2.getAddress();
    const acc3Addr = await account3.getAddress();

    // initial balance of account2
    const initBalanceOfAcc2 = await Web3Lagos.balanceOf(acc2Addr);
    expect(initBalanceOfAcc2.toString()).to.be.eq("0");

    // initial balance of account3
    const initBalanceOfAcc3 = await Web3Lagos.balanceOf(acc3Addr);
    expect(initBalanceOfAcc3.toString()).to.be.eq("0");

    // mint token
    const tx = await Web3Lagos.connect(account1).mintMultiple([acc2Addr, acc3Addr]);
    await tx.wait();

    // check balance of account2
    const newBalanceOfAcc2 = await Web3Lagos.balanceOf(acc2Addr);
    expect(newBalanceOfAcc2.toString()).to.be.eq("1");

    // check balance of account2
    const newBalanceOfAcc3 = await Web3Lagos.balanceOf(acc3Addr);
    expect(newBalanceOfAcc3.toString()).to.be.eq("1");
  });

  it("owner can't mint more than max", async () => {
    const acc2Addr = await account2.getAddress();

    // mint token
    for (let i = 0; i < 51; i++) {
      // mint 51 tokens
      const tx = await Web3Lagos.connect(account1).mint(acc2Addr);
      await tx.wait();
    }

    const errTx = Web3Lagos.connect(account1).mint(acc2Addr);
    // @ts-ignore
    await expect(errTx).to.be.rejected;
  });

  it("has corrent token uri for multiple accounts", async () => {
    const acc2Addr = await account2.getAddress();
    const acc3Addr = await account3.getAddress();

    // mint tokens for acc2 and acc3
    await (await Web3Lagos.connect(account1).mint(acc2Addr)).wait();
    await (await Web3Lagos.connect(account1).mint(acc3Addr)).wait();

    expect(await Web3Lagos.tokenURI("0")).to.be.eq(baseURI);
    expect(await Web3Lagos.tokenURI("1")).to.be.eq(baseURI);
  });
});
