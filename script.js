const MyBasalt = artifacts.require("./BasaltStore.sol");

module.exports = async function(callback) {
  const contract = await MyBasalt.deployed()
  const title = await contract.title
  console.log("Title:", title)
}
