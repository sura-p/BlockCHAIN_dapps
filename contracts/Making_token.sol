// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.9.0;


interface Token {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8 );
      function totalSupply()external  view  returns (uint256);

    function balanceOf(address _owner) external  returns (uint256 balance);

    function transfer(address _to, uint256 _value)
        external
        returns (uint amount);

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool success);

    function approve(address _spender, uint256 _value)
        external
        returns (bool success);

    function allowance(address _owner, address _spender)
        external
        view
        returns (uint256 remaining);

     event Transfer(address indexed _from, address indexed _to, uint256 _value);
     event Approval(address indexed _owner, address indexed _spender, uint256 _value);
     event bal(uint val);

   

}

contract Making_token is Token {
    string private Tname ; 
    uint8  private Tdecimals; 
    string private  Tsymbol  ;
    uint256 public _totalSupply ;
    address _owner =msg.sender;
    mapping(address => uint256) balances;
    mapping(address=>mapping(address=>uint256))allowed;


    modifier Onlyowner{
        require(msg.sender == _owner,"require owner");
        
        _;
    }


    constructor(
        // string memory _name,
        // string memory _symbol,
        // uint8 _decimal,
    
    ) {
        Tname ="rivh"; 
     Tdecimals = 10; 
      Tsymbol  ="RXB";
     _totalSupply =5000;
    balances[msg.sender]=_totalSupply;
        
        
    }
    function name() public override view returns (string memory ){
                return Tname;
    }

    function symbol() public override view returns (string memory){
                return Tsymbol;
    }

    function decimals() public override view returns (uint8){
                return Tdecimals;
    }

    function owner()public view  returns (address){
                return _owner;
    }


      function totalSupply()public override view  returns (uint256){
                return _totalSupply;
    }
    function balanceOf(address _check_address)
        public
        
        override
        returns (uint256 balance)
    {
        
        emit bal(balances[_check_address]);

        return balances[_check_address];
    }

    function transfer(address _to, uint256 _value)
        public 

        override
        returns (uint amount)
    {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender,_to, _value);
        return _value;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public override Onlyowner returns (bool success)
    {

         require(_value <= allowed[_from][_to],"value is greater");
         require(_value <= balances[_from],"not enough balance");
         allowed[_from][_to]-=_value;
          balances[_to] += _value;
         balances[_from] -= _value;
         emit Transfer( _from,_to, _value);

         return true;
    }

    function check_balance(address add) public Onlyowner view returns(uint256){
        return balances[add];
    }

    function approve(address _spender, uint256 _value)
        public
        override
        Onlyowner
        returns (bool success)
        {   
            //balances[_spender]=_value;
            allowed[msg.sender][_spender] = _value;
           emit  Approval( msg.sender, _spender,_value);
            return true;
        }

      function allowance(address _approvedBy, address _spender)
        public 
        override
        view
        returns (uint256 remaining)
        {
            return allowed[_approvedBy][_spender];
        }
        function mint (uint256 tokens) public Onlyowner returns (uint256) {
           
            _totalSupply +=tokens;
            balances[_owner]+=tokens;
            
            return balances[_owner];
        }

        function burn(uint256 tokens)public Onlyowner returns (bool success){
           
           require(balanceOf(msg.sender)>=tokens, "re-enter");
           _totalSupply-=tokens;
           balances[msg.sender] -=tokens;
           return true;
        }

        function set(uint x, uint y) public pure returns(uint) {
		return x + y;
	}

}
