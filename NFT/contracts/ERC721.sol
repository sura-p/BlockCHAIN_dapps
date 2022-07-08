// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;


import "./IERC721.sol";

contract ERC721 is IERC721 {
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _owners;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    mapping(uint256 => string) private _tokenURIs;
    string _name;
    string _symbol;



 constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

     function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_owners[tokenId] !=address(0), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function balanceOf(address owner)
        public
        view
        virtual
        override
        returns (uint256)
    {
        require(
            owner != address(0),
            "ERC721: address zero is not a valid owner"
        );
        return _balances[owner];
    }




    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "ERC721: invalid token ID");
        return owner;
    }

    // function safeTransferFrom(from, to, tokenId, data)public view virtual override returns;

   function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

     function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit Approval(ERC721.ownerOf(tokenId), to, tokenId);
    }

    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "ERC721: approve caller is not token owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal virtual {
        require(owner != operator, "ERC721: approve to caller");
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }
    
     function setApprovalForAll(address operator, bool approved) public virtual override {
        _setApprovalForAll(msg.sender, operator, approved);
    }
   
     function getApproved(uint256 tokenId) public  view returns (address operator){
        require(_owners[tokenId] != address(0),"invalid Token Id");
        return _tokenApprovals[tokenId];
     }

     function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public {
         address owner = ERC721.ownerOf(tokenId);
        require(msg.sender == owner || isApprovedForAll(owner, msg.sender) || getApproved(tokenId) == owner );

        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override{
        require(from != address(0),"given address not exist");
        require(to != address(0),"recepitent address invalid");
        require(_owners[tokenId]!=address(0),"Id not exits");
        require(_owners[tokenId]==from || getApproved(tokenId) == from ,"not owned by you");

        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);

    } 

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) public virtual override {

        require(from != address(0),"given address not exist");
        require(to != address(0),"recepitent address invalid");
        require(_owners[tokenId]!=address(0),"Id not exits");
        require(_owners[tokenId]==from || getApproved(tokenId) == from ,"not owned by you");



    }

}
