const web3 = require('../web3/index')

const manufacturer = async (req,res)=>{
    const part = (req.body.part).toString();
    const exdelidate = (req.body.dd).toString();
    const hash = await web3.order(part,exdelidate);
    res.send(hash)
}

const supplier = async (req,res)=>{
    const phash = (req.body.orderhash).toString();
    const hash = await web3.accessorder(phash);
    res.send(hash)
}

const change_ownership = async(req,res)=>{
    const to  = (req.body.address).toString();
    const p_hash  =(req.body.hash).toString();
   return await web3.change_ownership(p_hash,to);
}

module.exports = {manufacturer,supplier ,change_ownership}