const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ContractManager", function () {
  let ContractManager, contractManager, owner, addr1, addr2;

  beforeEach(async function () {
    ContractManager = await ethers.getContractFactory("ContractManager");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    contractManager = await ContractManager.deploy();
    await contractManager.deployed();
  });

  it("should set the owner correctly", async function () {
    expect(await contractManager.owner()).to.equal(owner.address);
  });

  it("should not allow non-owner to add contract", async function () {
    await expect(
      contractManager.connect(addr1).addContract(addr2.address, "Test description")
    ).to.be.revertedWith("Only the owner can call this function");
  });

  it("should allow owner to add contract", async function () {
    await contractManager.addContract(addr1.address, "Test description");
    expect(await contractManager.isContractRegistered(addr1.address)).to.equal(true);
  });

  it("should not allow non-owner to update description", async function () {
    await contractManager.addContract(addr1.address, "Test description");
    await expect(
      contractManager.connect(addr2).updateDescription(addr1.address, "New description")
    ).to.be.revertedWith("Only the owner can call this function");
  });

  it("should allow owner to update description", async function () {
    await contractManager.addContract(addr1.address, "Test description");
    await contractManager.updateDescription(addr1.address, "New description");
    expect(await contractManager.getContractDescription(addr1.address)).to.equal("New description");
  });

  it("should not allow non-owner to remove contract", async function () {
    await contractManager.addContract(addr1.address, "Test description");
    await expect(
      contractManager.connect(addr2).removeContract(addr1.address)
    ).to.be.revertedWith("Only the owner can call this function");
  });

  it("should allow owner to remove contract", async function () {
    await contractManager.addContract(addr1.address, "Test description");
    await contractManager.removeContract(addr1.address);
    expect(await contractManager.isContractRegistered(addr1.address)).to.equal(false);
  });

  it("should return correct contract description", async function () {
    await contractManager.addContract(addr1.address, "Test description");
    expect(await contractManager.getContractDescription(addr1.address)).to.equal("Test description");
  });

  it("should return all registered contract addresses", async function () {
    await contractManager.addContract(addr1.address, "Test description");
    await contractManager.addContract(addr2.address, "Another description");
    const addresses = await contractManager.getAllContractAddresses();
    expect(addresses).to.deep.equal([addr1.address, addr2.address]);
  });
});