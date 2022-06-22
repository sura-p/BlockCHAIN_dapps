const database = require('../database/dataconnection');
const web3 = require('../web3/index')
 const main = async (req,res)=>{

    lAddres = await web3.main(req.body.name);
    res.send(lAddres);
    


}

const account_connection = async (req,res)=>{
   
  address = await web3.main();
    res.send(address[0]);
   
}

const mint_token = async (req,res) =>{
    
    var amount = (req.body.amount);
    balance = await web3.mint(amount);
    console.log(balance);
    res.send(balance)
}

const checkbalance = async (req,res) =>{
     var addres = (req.body.address).toString();
    
    balance = await web3.check_balance(addres);
    console.log(balance);
    res.send(balance);
}

const approve = async (req,res) =>{
    const to = (req.body.to).toString();
    
    const value = (req.body.value).toString();
    const approved = await web3.approval(to,value);
    if(approved){
        res.send(`approved \n to: ${to} \n value : ${value}`).status(200);
    }
    else
    res.send("not approved");
    
}

const transfered = async (req,res)=>{
    const to = (req.body.to).toString();
    const from = (req.body.from).toString();
    const value = (req.body.value).toString(); 
    const transfering = await web3.transferFrom(from,to,value);
    res.send(transfering);
    return transfering ;
}
const ckeckallowed = async(req,res)=>{
    const spender = (req.body.spender).toString();
    const owner = (req.body.owner).toString();
    const allowed = await web3._check_allowence(owner,spender);
    res.send(`allowed balance : ${allowed}`);
}

const burnT= async (req,res) =>{
    const amount = (req.body.amount);
    balance = await web3.burn(amount);
    console.log(balance);
    res.send(balance)
}
const transfere = async (req,res)=>{
    const from = (req.body.from).toString();
    const to = (req.body.to).toString();
   
    const value = req.body.value; 
    console.log(from);
    const transfering = await web3.transfer1(from,to,value);
    res.send(transfering);
}
const changeOwner = async (req,res)=>{
        const from = (req.body.newowner).toString();
        const transfering = await web3._change_owner(from);
        res.send(transfering);
    }



module.exports = {main ,account_connection,mint_token,checkbalance,approve,transfered,ckeckallowed,burnT,transfere,changeOwner};