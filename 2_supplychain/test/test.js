const contract1  = artifacts.require('Supply_chain');
contract("part making",accounts => {
    it("should create a wheel and store it",async  () =>
        {
            const serial_number = "123456"
            const part_type = "wheel"
            const creation_date = "12/12/18"
            const contract2 = await contract1.deployed();
            console.log(accounts[0]);
            const x = await contract2.make_part(serial_number, part_type, creation_date, { from: accounts[0] });
                //Transactions don't return values, we will just check the final result of the test
                p_hash = await web3.utils.soliditySha3(accounts[0], web3.utils.fromAscii(serial_number),
                                                 web3.utils.fromAscii(part_type), web3.utils.fromAscii(creation_date))
                                                 console.log(p_hash);
                const y = await contract2.part.call(p_hash, { from: accounts[0] });
                    //The part_info is an object with the struct Part fields as keys
                    // console.log(part_info)
                    assert.equal(y["manufacturer"], accounts[0])
                    assert.equal(y["serial_number"], serial_number)
                    assert.equal(y["part_type"], part_type)
                    assert.equal(y["creation_date"], creation_date)
                
            
        }
    );
})






