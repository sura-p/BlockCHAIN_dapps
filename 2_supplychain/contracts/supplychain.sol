// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <=0.9.0;

contract Supply_Chain {
    enum State {
        MANUFACTURE,
        SUPPLIER,
        CUSTOMER
    }

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
    mapping (bytes32 => Part) public part;

    function INFO_AND_HASH(
        address _address,
        string memory serial_no,
        string memory part_type,
        string memory creation_date
    ) private pure returns (bytes32) {
        bytes20 b_a1 = bytes20(_address);
        bytes memory b_s1 = bytes(serial_no);
        bytes memory b_s2 = bytes(part_type);
        bytes memory b_s3 = bytes(creation_date);

        string memory s_full = new string(
            b_a1.length + b_s1.length + b_s2.length + b_s3.length
        );
        bytes memory b_full = bytes(s_full);
        uint256 j = 0;
        uint256 i;
        for (i = 0; i < b_a1.length; i++) {
            b_full[j++] = b_a1[i];
        }
        for (i = 0; i < b_s1.length; i++) {
            b_full[j++] = b_s1[i];
        }
        for (i = 0; i < b_s2.length; i++) {
            b_full[j++] = b_s2[i];
        }
        for (i = 0; i < b_s3.length; i++) {
            b_full[j++] = b_s3[i];
        }
        return keccak256(b_full);
    }

    function make_part(
        string memory serial_number,
        string memory part_type,
        string memory creation_date
    ) public returns (bytes32) {
        State state;
        state=State.SUPPLIER;
        bytes32 part_hash = INFO_AND_HASH(
            msg.sender,
            serial_number,
            part_type,
            creation_date
        );
        require(
            part[part_hash].manufacturer == address(0),
            "product Already exists"
        );
        Part memory new_part = Part(
            msg.sender,
            serial_number,
            part_type,
            creation_date
        );
        part[part_hash] = new_part;
        return part_hash;
    }

    function make_Product(
        string memory serialno,
        string memory product_type,
        string memory creation_date,
        bytes32[6] memory parts_array
    ) public returns (bytes32) {
            State state;
            state=State.MANUFACTURE;
            uint  i ;
        for (uint index = 0; index < parts_array.length; index++) {

                require(part[parts_array[i]].manufacturer != address(0), "part not available");
        }
                bytes32 product_hash = INFO_AND_HASH(
            msg.sender,
            serialno,
            product_type,
            creation_date
        );

                Product memory new_product = Product(msg.sender ,serialno,product_type,creation_date,parts_array);
                
                product[product_hash]=new_product;

           return product_hash; 
       
    }

       function getParts(bytes32 product_hash) public view  returns (bytes32[6] memory){
       
        require(product[product_hash].manufacturer != address(0), "Product inexistent");
        return product[product_hash].parts;
    }




}
