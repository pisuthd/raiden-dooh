pragma solidity ^0.4.24;

contract publisher {

    struct Publisher {
        address owner;
        string title;
    }

    mapping(uint256 => Publisher) pubs;
    
    uint256 private pubsCount = 0;

    
    
    function numPublisher() public view returns (uint256) {
        return pubsCount;
    }
    
    function registerPublisher(address _owner, string _title) public {
        pubsCount = pubsCount + 1;
        pubs[pubsCount].owner = _owner;
        pubs[pubsCount].title = _title;
    }
    
    function getPublisherId(address _owner) public view returns (uint256) { 
        
        uint max = pubsCount+1;
        uint id = 0;
        for (uint i=1; i<max;i++) {
            if (pubs[i].owner == _owner) {
                id = i;
                break;
            }
        }
        return id;
    }
    
    function getPublisher(uint256 _id) public view returns (address, string) {
        return (pubs[_id].owner, pubs[_id].title);
    }
    
    
    function getPublisherByAddress(address _owner) public view returns (string) { 
        string memory title = "";
        uint max = pubsCount+1;
        for (uint i=1; i<max;i++) {
            if (pubs[i].owner == _owner) {
                title = pubs[i].title;
                break;
            }
        }
        return title;
    }



}