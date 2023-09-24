const {Web3}=require('web3');
const fs=require('fs');
const ContractAdd="0x09f08829DCDda7091eaffaaE2E7050DC9e6B55dE"
const ContractABI=JSON.parse(fs.readFileSync('./interactWithContract/UserABI.json',"utf-8"));


const provider=new Web3("http://127.0.0.1:9545");
const Contractor=new provider.eth.Contract(ContractABI,ContractAdd);

module.exports=Contractor; 