const express=require('express');
const routee=express.Router();

routee.get('/',(req,res)=>{res.status(200).json({name:"hello"})});

module.exports=routee;