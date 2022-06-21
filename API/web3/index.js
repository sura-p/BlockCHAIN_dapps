const Web3 = require('web3');
const Accounts = require('web3-eth-accounts');
const Coll = require('../models/model.js')
const web3 = new Web3('https://rinkeby.infura.io/v3/585ae7139b904eb89be2fc1f2fa461d8');
const conf = require('../../build/contracts/Making_token.json')
const contract_Address = conf.networks['4'].address;
const contract_ABI = conf.abi;
const deploying = new web3.eth.Contract(contract_ABI,contract_Address);
const privatekey = '438d1dc6ea8a8cc7ab751eaf7652735e70ba1d3fae3dbfdd65aa894ee5e00921'
let Address = {};


const main = async (name)=>{
   
    
   try
   {
       Address = await web3.eth.accounts.create();
       console.table(Address);
       Address.result = Address.address;
       const db = {
        
           Address:Address.address
       }
       const x = new Coll(db);
       await x.save();
   }
   catch(err)

   {
        console.log(err);
   }
   return Address;
}      
const mint = async (amount )=>{
   
    const balance = await deploying.methods.mint(amount).send({from:`${Address.result}`});
    return balance;
}

const check_balance = async (address1)=>{
    
    const nonce = await web3.eth.getTransactionCount(address1);
    const balance = await deploying.methods.balanceOf(address1);
    const gasprice = await web3.eth.getGasPrice();
    let data = balance.encodeABI();
    const tx= {
        from: address1,
        to: contract_Address,
        gas: 1000000,
        gasPrice:gasprice,
        data,
        nonce
      }


      const signature = await web3.eth.accounts.signTransaction(tx,privatekey);
      const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
    return recepit;
    
    ;
}

const approval = async (_to , _value) =>{
    const nonce = await web3.eth.getTransactionCount('0xEE83dDe84627668DC4e68baf530557373B2f1Dbb');
    const approved = await deploying.methods.approve(_to,_value).encodeABI();
    const tx= {
        from: '0xEE83dDe84627668DC4e68baf530557373B2f1Dbb',
        to: contract_Address,
        gas: 10000000,
        _value,
        gasPrice:gasprice,
        approved,
        nonce
      }
      const signature = await web3.eth.accounts.signTransaction(tx,privatekey);
      const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
      return recepit;
}

const transferFrom = async (_from,_to, _value) =>{
   
    const nonce = await web3.eth.getTransactionCount(_from);
    const extraData = await deploying.methods.transferFrom(_from,_to,_value);
    const data = extraData.encodeABI();
   const gasprice = await web3.eth.getGasPrice();
    const tx= {
        from: _from,
        to: contract_Address,
        gas: 10000000,
        _value,
        gasPrice:gasprice,
        data,
        nonce
      }
      
      const signature = await web3.eth.accounts.signTransaction(tx,privatekey);
      const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
    
      const events =  recepit;
      console.log(events);
    return events
    
}
const _check_allowence = async (_owner,_spender)=>{
   ;
    const allowed = await deploying.methods.allowance(_owner,_spender).call({from:`${Aaddress[0]}`});
    return allowed;
}

const burn  = async(amount)=>{
   
    const burn = await deploying.methods.burn(amount);
    const nonce = await web3.eth.getTransactionCount('0xEE83dDe84627668DC4e68baf530557373B2f1Dbb');
    const data = burn.encodeABI();
    const gasprice = await web3.eth.getGasPrice();
    const tx= {
        from: "0xEE83dDe84627668DC4e68baf530557373B2f1Dbb",
        to: contract_Address,
        gas: 3000000,
        gasPrice:gasprice,
        data:data,
        nonce:nonce
      }
      
      const signature = await web3.eth.accounts.signTransaction(tx,privatekey);
      const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
       console.log(recepit);
       return recepit;
      }

const transfer1 = async (_from ,address,_value)=>{
    
    const nonce = await web3.eth.getTransactionCount(_from);
    const transfer = await deploying.methods.transfer(_from,address,_value);
    const x = _value.toString();
    const data = transfer.encodeABI();
    const gasprice = await web3.eth.getGasPrice();
    const tx= {
        from: _from,
        to: contract_Address,
        gas: 3000000,
        _value,
        gasPrice:gasprice,
        data:data,
        nonce:nonce
      }
      
      const signature = await web3.eth.accounts.signTransaction(tx,privatekey);
      const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
     // deploying.events.getPastEvents('Transfer' ,function(error, event){ console.log(event); })
    
       return recepit;
      }


      const _change_owner = async (new_owner)=>{
        const Aaddress = await main();
        const allowed = await deploying.methods.changeOwner(_owner,_newOwner).call({from:`${Aaddress[0]}`});
        return allowed;
      }

module .exports={main,mint,check_balance,approval,transferFrom,_check_allowence,burn,transfer1,_change_owner};