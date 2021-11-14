const Emyem = artifacts.require("Emyem");
const FirstPresale = artifacts.require("FirstPresale");
const SecondPresale = artifacts.require("SecondPresale");
const TeamVesting = artifacts.require("TeamVesting");

module.exports = async function (deployer) {
  await deployer.deploy(FirstPresale, "0x21C3bBEEd8DeA53F0D5751BF0687822c9Bb57b42");
  const firstPresale = await FirstPresale.deployed();

  await deployer.deploy(SecondPresale, "0x21C3bBEEd8DeA53F0D5751BF0687822c9Bb57b42");
  const secondPresale = await SecondPresale.deployed();

  await deployer.deploy(TeamVesting, "0x21C3bBEEd8DeA53F0D5751BF0687822c9Bb57b42");
  const teamVesting = await TeamVesting.deployed();

  await deployer.deploy(Emyem, "0x21C3bBEEd8DeA53F0D5751BF0687822c9Bb57b42", "0x659CeDea7d1988d96e3CA05A13AF215CC27A4710", firstPresale.address, secondPresale.address, teamVesting.address);
  const emyem = await Emyem.deployed();

  await firstPresale.setToken(emyem.address);
  await secondPresale.setToken(emyem.address);
  await teamVesting.setToken(emyem.address);
};