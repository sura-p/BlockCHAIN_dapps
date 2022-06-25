const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const conf = require('../../build/contracts/Supply_Chain.json');
const conf2 = require('../../build/contracts/ownwership.json');
const contract_Address = conf.networks['5777'].address;
const contract_Address2 = conf2.networks['5777'].address;
const contract_ABI = conf.abi;
const contract_ABI2 = conf2.abi;
const deploying = new web3.eth.Contract(contract_ABI,contract_Address);
const deploying2 = new web3.eth.Contract(contract_ABI2,contract_Address2);

const order = async (parts,expdelidate)=>{

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const orderhash = await deploying.methods.create_order(parts,expdelidate,today).call({from:'0x72A5163E673eEe283A82C6A55d94d5957AF99CfA',gas:300000});
    const orderhash2 = await deploying.methods.create_order(parts,expdelidate,today).send({from:'0x72A5163E673eEe283A82C6A55d94d5957AF99CfA',gas:300000});
    return orderhash;


}

const accessorder = async(orderHash)=>{

    const orderdetail = await deploying.methods.get_order(orderHash).call({from:'0x40dA06fAa56Bb9D2fcE819698f90dC17771475E2',gas:100000});
    return orderdetail;
}


const build_part = async (sr_no,part_type,mfg_date)=>{
    
    const hash = await deploying.methods.make_part(sr_no,part_type,mfg_date).call({from:'0x40dA06fAa56Bb9D2fcE819698f90dC17771475E2',gas:300000});
    const hash1 = await deploying.methods.make_part(sr_no,part_type,mfg_date).send({from:'0x40dA06fAa56Bb9D2fcE819698f90dC17771475E2',gas:300000});
    const ownership = await deploying2.methods.add_ownership(0,hash).send({from:'0x40dA06fAa56Bb9D2fcE819698f90dC17771475E2'});
    return hash;
}

const part_info = async (hash)=>{
      const hash1 = await deploying.methods.getPartInfo(hash).call({from:'0x40dA06fAa56Bb9D2fcE819698f90dC17771475E2',gas:300000});
      
    return hash1;
}



const change_ownership = async (phash,to)=>{
    const owner = await deploying2.methods.changeOwnership(0,phash,to).send({from:'0x40dA06fAa56Bb9D2fcE819698f90dC17771475E2',gas:100000});
    return owner;
}



module.exports = { order,accessorder,build_part, part_info,change_ownership}