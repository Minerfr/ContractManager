const hre = require("hardhat");

async function main() {
  const Lock = await hre.ethers.getContractFactory("ContractManager");
  const lock = await Lock.deploy();
  await lock.deployTransaction.wait();

  console.log(`deployed to ${lock.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode =  1;
});