const { Contract } = require("web3");

exports.getProviders=(ContractObj)=>{
   console.log(ContractObj);
}
exports.getEventName=(ContractObj)=>{
    console.log(ContractObj.events);
}
exports.getMethods=(ContractObj)=>{
    console.log(ContractObj.methods);
}
exports.addFile=async (ContractObj,account,filename,description)=>{
    const acc=await account;
    console.log(acc);
    try{
        const receit= await ContractObj.methods.addFile(filename,description).send({from:acc[0]}).on('receipt',(rs)=>console.log(rs));
  
    }
   catch(err){
    console.log(err); 
   }
}

exports.getFileCount=async(ContractObj,account)=>{
  const acc=await account;
  const result=await ContractObj.methods.getFileCount().send({from:acc[0]});
  console.log('Transaction Hash:', result.transactionHash);

  // Listen for the event

    console.log(result);
}

exports.createUser=async(ContractObj,account,firstName,lastName,email,password,confirmPassword)=>{
        ContractObj.methods.createUser(firstName,lastName,email,password,confirmPassword).send({from:account})
        .on('receit',(rs)=>console.log("Transaction Receit : ",rs))
        .on('error',(err)=>{console.log("Error Receipt : ",err)});
}
exports.getAllusers=async(ContractObj,account)=>{
    ContractObj.methods.Allusers().call({from:account});
}
