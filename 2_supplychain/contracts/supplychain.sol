// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <=0.9.0;



contract Supply_Chain {
    enum State {ACCEPTED,DECLINED,INPROCESS ,DELIVERED}
       State state =  State.DECLINED;
    struct Order {
        address manufactureradd;
        string part_type;
        string deliverOn;
        string orderdate;
        string quantity;
    }


    struct Part {
        address supplier;
        string manufacturedate;
        string part_type;
        string serialno;
        uint256 price;
    }

    struct Product {
        address manufacturer;
        string serial_number;
        string product_type;
        string manufacturedate;
        bytes32[6] parts;
        uint256 price;
    }

    struct part_recepit{
        bytes32 orderhash;
        address supplier;
        uint partPrice;
        string parttype;

    }
    mapping(bytes32=>part_recepit) public part_detail;
    mapping(bytes32 => Order) public order;
    mapping(bytes32 => Product) public product;
    mapping(bytes32 => Part) public part;
event paymentDone(address reciver,address sender,uint256 amount,bytes32);

modifier onlymanufacturer(bytes32 hash){
    
    require(order[hash].manufactureradd==msg.sender,"not the right manufacturer");
    _;
}
modifier rightsupplier(bytes32 hash,address receiver){
    require(part_detail[hash].supplier == receiver,"choose right supplier");
    _;
}

//making hash
    function INFO_AND_HASH(
        address _address,
        string memory orderdate,
        string memory part_type,
        string memory deliverOn
    ) private pure returns (bytes32) {
        bytes20 b_a1 = bytes20(_address);
        bytes memory b_s1 = bytes(orderdate);
        bytes memory b_s2 = bytes(part_type);
        bytes memory b_s3 = bytes(deliverOn);

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
            b_full[j++] = b_s2[i];
        }
        return keccak256(b_full);
    }
// creating order
    function create_order(
        string memory part_type,
        string memory deliverOn,
        string memory orderdate,
        string memory quantity
    ) public  returns (bytes32) {

        bytes32 order_hash = INFO_AND_HASH(
            msg.sender,
            part_type,
            deliverOn,
            orderdate
        );
        Order memory new_order = Order(
            msg.sender,
            part_type,
            deliverOn,
            orderdate,
            quantity
        );

        
       order[order_hash] = new_order;
        return order_hash;
    }
function view_order(bytes32 orderhash) public view  returns (Order memory) {
        return order[orderhash];
    }

//accepting the order

    function accept_order(bytes32 orderhash) public  returns (Order memory) {
         state = State.ACCEPTED;
        return order[orderhash];
    }
//making part after order recivied
    function make_part(bytes32 orderhash, string memory manufacturedate ,string memory serialno ,uint256 price)
        public
        returns (bytes32 partHash)
    {    state = State.INPROCESS;
        bytes32 part_hash = INFO_AND_HASH(
            msg.sender,
            order[orderhash].part_type,
            order[orderhash].deliverOn,
            order[orderhash].orderdate
        );
        require(
            part[part_hash].supplier == address(0),
            "product Already exists"
        );
        Part memory new_part = Part(
            msg.sender,
            manufacturedate,
            order[orderhash].part_type,
            serialno,
            price*10**18
        );
        part[part_hash] = new_part;
        return part_hash;
    }
//after making part ,configuring part receipt
        function partrecepit(bytes32 orderhash,bytes32 partHash)public returns(bytes32){
            uint price = part[partHash].price;
            string memory parttype = part[partHash].part_type;
            address supplier = part[partHash].supplier;
            part_recepit memory recepit = part_recepit(orderhash,supplier,price, parttype);
            part_detail[orderhash]=recepit;
            return orderhash;
        }

        function getpartrecepit(bytes32 orderhash)public view returns(part_recepit memory){
            
            return part_detail[orderhash];
        }
   //making payment to get part     
        function getparts(address payable receiver,bytes32 orderh ) rightsupplier(orderh,receiver) onlymanufacturer(orderh) payable external returns (bool) {
        uint256 amount = msg.value;
        require(part_detail[orderh].partPrice==amount,"supplier price not matched");
        
        receiver.transfer(amount);  
        emit paymentDone(receiver,msg.sender,msg.value,orderh);
        return true;
}

    function make_Product(
        string memory serialno,
        string memory product_type,
        string memory creation_date,
        bytes32[6] memory parts_array,
        uint price
    ) public returns (bytes32) {
        for (uint256 index = 0; index < parts_array.length; index++) {
            require(
                part[parts_array[index]].supplier != address(0),
                "part not available"
            );
        }
        bytes32 product_hash = INFO_AND_HASH(
            msg.sender,
            serialno,
            product_type,
            creation_date
            
        );

        Product memory new_product = Product(
            msg.sender,
            serialno,
            product_type,
            creation_date,
            parts_array,
            price*10**18
        );

        product[product_hash] = new_product;

        return product_hash;
    }

    function getProductParts(bytes32 product_hash)
        public
        view
        returns (bytes32[6] memory)
    {
        require(
            product[product_hash].manufacturer != address(0),
            "Product inexistent"
        );
        return product[product_hash].parts;
    }

    function getPartInfo(bytes32 parthash)
        public
        view
        returns (Part memory detail)
    {
        return part[parthash];
    }
}