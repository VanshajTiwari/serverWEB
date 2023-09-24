// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
const FileSharing=artifacts.require("FileShare");
const USERS=artifacts.require('USERS');
module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
    deployer.deploy(FileSharing);
    deployer.deploy(USERS);
};
 