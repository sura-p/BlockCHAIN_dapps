const web3 = require('../web3/index')

const supplier = async (req,res)=>{
    const sr_no = (req.body.serial_no).toString();
    const part_type = (req.body.part_type).toString();
    const mfg_date = (req.body.mfg_date).toString();
    const hash = await web3.build_part(sr_no,part_type,mfg_date);
    res.send(hash)
}

const part_info1 = async (req,res)=>{
    const phash = (req.body.hashp).toString();
    const hash = await web3.part_info(phash);
    res.send(hash)
}

const change_ownership = async(req,res)=>{
    const to  = (req.body.address).toString();
    const p_hash  =(req.body.hash).toString();
   return await web3.change_ownership(p_hash,to);
}

module.exports = {supplier,part_info1 ,change_ownership}