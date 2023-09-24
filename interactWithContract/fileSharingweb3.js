const {Web3} =require('web3');
const fs=require('fs');
//const FileSharingABI=fs.readFileSync("./FileSharingABI.json","utf-8",(err)=>{console.log(err)});

    // console.log(Web3); 
const COntractAdd="0x5648d6fd0Ace8d253B08B7E2D3B0b983eAb5E3A7";
const File_ABI=JSON.parse(fs.readFileSync("./interactWIthContract/FileSharingABI.json","utf-8"));

const Providers=new Web3(new Web3.providers
.HttpProvider('http://localhost:9545'));
async function account(){return await Providers.eth.getAccounts()};
//const fileSharingContract=new Providers.eth.Contract(File_ABI,COntractAdd);

const fileSharingContract=function(){
  return  new Providers.eth.Contract(File_ABI,COntractAdd)
}
module.exports={Providers,fileSharingContract,account};
 

