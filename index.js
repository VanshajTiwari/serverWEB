const Express=require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const App=Express();
const route1=require('./Routes/route1');
const authRoutes = require('./Routes/authRoute')

//Contract Obj
// const userContract=require('./interactWithContract/Usersweb3');
// const FileShareContract=require("./interactWithContract/fileSharingweb3");

//                               CONTRACT                                                    ////////
// const {getProviders,getEventName,getMethods,addFile,getFileCount,createUser,getAllusers}=require("./Controllers/ContractMethods"); //Contract methods
// //getMethods(userContract);


//  Contract Methods
//     let account="0xef665d5c332854cfb5c567da3f6f8929eac0c256";
//     const functionName = 'create'; // Replace with the function name
// const params = ["Vanshaj","Tiwari","vanshajtiwari@gmail.com","123333","123333"]; // Replace with your function's parameters

// Example: Sending data to a contract function that changes the contract state
// console.log(userContract.methods['Allusers']);
// userContract.methods["createUser"](...params)
//   .send({from:account})
  //.on('error',err=>console.log("ERROR : ",err));
//createUser(userContract,account,"Vanshaj","Tiwari","vanshajtiwari@gmail.com","123333","123333");
   // console.log(userContract.methods.getAllusers().call({from:account}).then(e=>console.log(e)));
  //  getAllusers(userContract,account);
 

App.use(cors());
App.use(Express.json());

const dbURI = 'mongodb+srv://vanshajt01:2023internship@cluster0.dv2ivut.mongodb.net/authDB?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser : true}).then((res)=>console.log("DB connected"));

// ENDPOINTS
App.use('/',route1);
App.use('/auth',authRoutes)
App.use("*",(req,res)=>res.status(404).json({status:'fail',code:'404'}));
App.listen(7575,()=>{console.log("http://127.0.0.1:7575")});