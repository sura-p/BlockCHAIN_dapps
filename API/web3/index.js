const Web3 = require('web3');
const web3 = new Web3('https://rinkeby.infura.io/v3/585ae7139b904eb89be2fc1f2fa461d8');
const conf = require('../../build/contracts/Making_token.json')
const contract_Address = conf.networks['5777'].address;
const contract_ABI = conf.abi;
const deploying = new web3.eth.Contract(contract_ABI,contract_Address);
const privatekey = 'a8e12dcf2d22d2912ff548580e31a461fbc8b6308e0584fd456482bbfd17f5f3';





const main = async ()=>{
   // const accounts = await web3.eth.accounts.create();
    const Aaddress = await web3.eth.getAccounts();
                  
                  return Aaddress
}      
const mint = async (amount )=>{
    const Aaddress = await main();
    const balance = await deploying.methods.mint(amount).send({from:`${Aaddress[0]}`});
    return balance;
}

const check_balance = async (address1)=>{
    const Aaddress= await main();
    console.log(Aaddress);
    const nonce = await web3.eth.getTransactionCount(address1);
    const balance = await deploying.methods.balanceOf(address1);
    const data = balance.encodeABI();
    const gasprice = await web3.eth.getGasPrice();
    const tx= {
        from: address1,
        to: contract_Address,
        gas: 1000000,
        gasPrice:gasprice,
        data: data,
        nonce
      }

      const signature = await web3.eth.accounts.signTransaction(tx,privatekey);
      const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
      tx.balance = balance;
      console.log(tx);
    //   return recepit;
    ;
}

const approval = async (_to , _value) =>{
    const Aaddress = await main();
    const approved = await deploying.methods.approve(_to,_value).send({from:`${Aaddress[0]}`});
    return approved;
}

const transferFrom = async (_from,_to, _value) =>{
    const Aaddress = await main();
    const nonce = await web3.eth.getTransactionCount(_from);
    const extraData = await deploying.methods.transferFrom(_from,_to,_value);
    const data = extraData.encodeABI();
   const gasprice = await web3.eth.getGasPrice();
   console.log(gasprice);
   console.log(data);
    const tx= {
        from: _from,
        to: contract_Address,
        gas: 1000000,
        _value,
        gasPrice:gasprice,
        data,
        nonce
      }
      const signature = await web3.eth.accounts.signTransaction(tx,privatekey);
      console.log(extraData)
      const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
      return recepit;
    
    
}
const _check_allowence = async (_owner,_spender)=>{
    const Aaddress = await main();
    const allowed = await deploying.methods.allowance(_owner,_spender).call({from:`${Aaddress[0]}`});
    return allowed;
}

const burn  = async(amount)=>{
    const Aaddress = await main();
    const burn = await deploying.methods.burn(amount).send({from:`${Aaddress[0]}`});
    return burn;
}
const transfer1 = async (address,value)=>{
    const Aaddress = await main();
    console.log(Aaddress[0]);
const transfer = await deploying.methods.transfer(address,value).send({from:`${Aaddress[0]}`});
return transfer;
// const nonce = await web3.eth.getTransactionCount(Aaddress[0]);
// const gasprice = await web3.eth.getGasPrice();
// const tx= {
//     from: Aaddress[0],
//     to: contract_Address,
//     gas: 1000000,
//     value,
//     gasPrice:gasprice,
//     nonce
//   }
}


module .exports={main,mint,check_balance,approval,transferFrom,_check_allowence,burn,transfer1};