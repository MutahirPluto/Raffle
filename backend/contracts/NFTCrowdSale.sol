// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFT.sol";

contract NFTCrowdsale is Context, ReentrancyGuard,Ownable{

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    uint256 public maxGiveAway = 7777;
    uint256 private limit = 2;
    uint256 public prePrice = 70000000000000000 wei;
    uint256 current = block.timestamp * 1 seconds;
    uint256 limitationtime = block.timestamp + 2 minutes   * 1 seconds;
    uint256 private _weiRaised;
    address payable private _wallet;
    bool public finalized;
    bool public pre;
    mapping(address => bool) private _whitelist;
    uint256 public whitelistCount;
    
    NFT private nft;
    // address payable private _wallet;

    uint256 private _nftPurchased;
    
    mapping (address => uint256) purchase;
    mapping (address => uint256) msgValue;

    function whitelist(address account)public view returns(bool){
        return _whitelist[account];
    }

     function startSale(address[] memory accounts, address payable wallet ,address _nft) public onlyOwner {
        //NFT(_nft) req
        require(address(_nft) != address(0), "NFT: token is the zero address");
        nft = NFT(_nft);
        if(accounts.length==0){
        pre = true;
        }
        else{
            pre = false;
            for (uint256 i = 0; i < accounts.length; i++) {
                _addPayee(accounts[i]);
            } 
        }
    
    }
     function _addPayee(address account) private {
        require(account != address(0), "PaymentSplitter: account is the zero address");
        _whitelist[account]=true;
        whitelistCount++;
    }
   
 
    fallback () external payable {
        buyNFT();
    }

    receive () external payable {
        buyNFT();
    }

    function buyNFT() public nonReentrant payable {
        uint256 price;
        price = prePrice;
        require (!finalized,"Sale Ended");
        uint256 weiAmount  = msg.value;
        require (weiAmount >=  price,"please provide exact amount for one NFT");

        _nftPurchased ++;

        purchase[_msgSender()]++;

        // update state
        _weiRaised = _weiRaised.add(weiAmount);

        _wallet.transfer(weiAmount);   

        nft.createToken(_msgSender());   

    }

     function Finalize() public  returns(bool) {
        require(!finalized,"already finalized");
        if(pre){
            require( nft.maxGiveAway() - limit == _nftPurchased, "the crowdSale is in progress");
            //nft.transferOwnership(_wallet);
            finalized = true;
        }
        else{
            require( limit == _nftPurchased, "the crowdSale is in progress");
            //nft.transferOwnership(_wallet);
            finalized = true;
        }
        return finalized;
    }

} 