pragma solidity ^0.4.24;

contract ad {

    struct Ad {
        address owner;
        string title;
        string image_url;
    }

    mapping(uint256 => Ad) ads;
    
    uint256 private adCount = 0;

    function numAd() public view returns (uint256) {
        return adCount;
    }




}