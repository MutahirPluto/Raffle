// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();

  await nft.deployed();

  const NFTCrowdsale = await hre.ethers.getContractFactory("NFTCrowdsale");
  const nFTCrowdsale = await NFTCrowdsale.deploy();

  await nFTCrowdsale.deployed();

  const Tx = await nft.addOwner(nFTCrowdsale.address)
  Tx.wait()

  

  saveFrontendFiles(nFTCrowdsale, nft);
}


function saveFrontendFiles(nFTCrowdsale, nft) {
  const fs = require("fs");
  const contractsDir = "../frontend/pages/contract";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  let config = `
 export const nft_addr = "${nft.address}"
 export const nftPreSale_addr = "${nFTCrowdsale.address}"
`
//change BUSD address "0xA41e502175D8086225B83b77883986C0dA0B04C7" -rinkeby
//change BUSD address "0x17331B1B090cfA4E8754Bb0637206C1186926C4D" -BSC testnet
//pegged BUSD test = 0xca9Eb9DDC1B511d5B67d833D1d36Ee85503DA93E -BSC testnet 

  let data = JSON.stringify(config)
  fs.writeFileSync(
    contractsDir + '/addresses.js', JSON.parse(data)

  );
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
