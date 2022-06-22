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

contract ownwership {}
