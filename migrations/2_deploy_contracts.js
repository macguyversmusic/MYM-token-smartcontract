const Emyem = artifacts.require("Emyem");
const FirstPresale = artifacts.require("FirstPresale");
const SecondPresale = artifacts.require("SecondPresale");
const TeamVesting = artifacts.require("TeamVesting");

module.exports = async function (deployer) {
  await deployer.deploy(FirstPresale);
  const firstPresale = await FirstPresale.deployed();

  await deployer.deploy(SecondPresale);
  const secondPresale = await SecondPresale.deployed();

  await deployer.deploy(TeamVesting, "0x1a84F1f9CE6f4bF0FD2b1B4689Db53776e64bF1c"); // TODO: Cambiar la wallet del equipo.
  const teamVesting = await TeamVesting.deployed();

  await deployer.deploy(Emyem, "0x1a84F1f9CE6f4bF0FD2b1B4689Db53776e64bF1c", firstPresale.address, secondPresale.address, teamVesting.address); // TODO: Cambiar la wallet del equipo.
  const emyem = await Emyem.deployed();

  await firstPresale.setToken(emyem.address);
  await secondPresale.setToken(emyem.address);
  await teamVesting.setToken(emyem.address);
};