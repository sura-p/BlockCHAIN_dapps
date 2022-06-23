// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <=0.9.0;

contract Supply_Chain {
    struct Part {
        address manufacturer;
        string serial_number;
        string part_type;
        string creation_date;
    }
    struct Product {
        address manufacturer;
        string serial_number;
        string product_type;
        string creation_date;
        bytes32[6] parts;
    }

    mapping(bytes32 => Product) public product;
    mapping(bytes32 => Part) public part;

    function getParts(bytes32 product_hash)
        public
        view
        returns (bytes32[6] memory)
    {}
}

contract ownwership {
    enum Operation {PART,PRODUCT}
    mapping(bytes32=>address) public currentPartOwner;
    mapping(bytes32=>address) public currentProductOwner;
    event TransferPartOwnership(bytes32 indexed p,address indexed account );
    event TransferProductOwnership(bytes32 indexed p,address indexed account );
    Supply_Chain private SC;

    constructor(address product_contract){
        SC = Supply_Chain(product_contract);

    }

    function add_ownership(uint op_type,bytes32 p_hash) public returns (bool){
        if(op_type==uint (Operation.PART)){
            address manufacturer;
            (manufacturer, , ,) = SC.part(p_hash);
            require(currentPartOwner[p_hash]==address(0),'part is already registered');
            require(manufacturer==msg.sender,"part was not made by requester");
            currentPartOwner[p_hash]=msg.sender;
            emit TransferPartOwnership(p_hash,msg.sender);

        }
        else if (op_type==uint (Operation.PRODUCT)){
                address manufacturer;
                (manufacturer, , ,) = SC.product(p_hash);
               require(currentProductOwner[p_hash]==address(0),'part is already registered');
            require(manufacturer==msg.sender,"part was not made by requester");
            currentProductOwner[p_hash]=msg.sender;
            emit TransferProductOwnership(p_hash,msg.sender); 
        }
    }

    function changeOwnership(uint op_type, bytes32 p_hash, address to) public returns (bool) {
      //Check if the element exists and belongs to the user requesting ownership change
        if(op_type == uint(Operation.PART)){
            require(currentPartOwner[p_hash] == msg.sender, "Part is not owned by requester");
            currentPartOwner[p_hash] = to;
            emit TransferPartOwnership(p_hash, to);
        } else if (op_type == uint(Operation.PRODUCT)){
            require(currentProductOwner[p_hash] == msg.sender, "Product is not owned by requester");
            currentProductOwner[p_hash] = to;
            emit TransferProductOwnership(p_hash, to);
            //Change part ownership too
            bytes32[6] memory part_list = SC.getParts(p_hash);
            for(uint i = 0; i < part_list.length; i++){
                currentPartOwner[part_list[i]] = to;
                emit TransferPartOwnership(part_list[i], to);
            }
        }
    }
}