pragma solidity ^0.4.24;

contract publisher {

    struct Publisher {
        address owner;
        string secret;
        string title;
    }

    mapping(uint256 => Publisher) pubs;
    
    uint256 private pubsCount = 0;

    
    
    function numPublisher() public view returns (uint256) {
        return pubsCount;
    }



}