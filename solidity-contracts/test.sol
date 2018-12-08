pragma solidity ^0.4.24;

contract hx1 {
    
    address facilitator = 0xFdFca5293A302DF1c2a4524bC0D875eFc753A1F3;
    
    
    struct Prop {
      address owner;
      uint256 lat;
      uint256 long;
      // status
      // 0 : not available
      // 1 : available
      // 2 : busy
      int status;
      string title;
      uint256 deposit;
      uint256 ask;
      string metadataURL;
      string metadataHash;
      uint timeStamp;
    }
    
    struct Ad {
        address owner;
        // status
        // 0 : pending
        // 1 : approved
        int status;
        uint256 prop_id;
        uint256 deposit;
        uint256 bid;
        string metadataURL;
        string metadataHash;
        uint timeStamp;
        
    }
    
    mapping(uint256 => Prop) props;
    mapping(uint256 => Ad) ads;
    
    uint256 private propCount = 0;
    uint256 private adCount = 0;
    
    uint public currentTime;
    uint public lastRound;
    
    constructor() public
    {
        currentTime = now;
        lastRound = now;
    }
    
    function numProp() public view returns (uint256) {
        return propCount;
    }
    
    function numAd() public view returns (uint256) {
        return adCount;
    }
    
    function registerProp(uint256 lat, uint256 long, string title, uint256 ask, string metadataURL,string metadataHash ) public {
        
        propCount = propCount+1;
        props[propCount].owner = msg.sender;
        props[propCount].title = title;
        props[propCount].long = long;
        props[propCount].lat = lat;
        props[propCount].ask = ask;
        props[propCount].deposit = 0;
        props[propCount].status = 0;
        props[propCount].timeStamp = now;
        props[propCount].metadataURL = metadataURL;
        props[propCount].metadataHash = metadataHash;
        
    }
    
    
    function createAd(uint256 prop_id, uint256 bid, string metadataURL, string metadataHash) payable public {
        require(msg.value > 0);
        adCount = adCount + 1;
        ads[adCount].owner = msg.sender;
        ads[adCount].prop_id = prop_id;
        ads[adCount].bid = bid;
        ads[adCount].metadataHash = metadataHash;
        ads[adCount].metadataURL = metadataURL;
        ads[adCount].timeStamp = now;
        ads[adCount].deposit = msg.value;
        facilitator.transfer(msg.value);
    }
    
    function getAd(uint256 _id) public view returns (address, uint256, uint256, uint256, string) {
        return (ads[_id].owner, ads[_id].prop_id, ads[_id].bid, ads[_id].deposit, ads[_id].metadataURL);
    }
    
    function getProp(uint256 _id) public view returns (address, string, uint256,int, uint256, string) {
        return (props[_id].owner ,props[_id].title, props[_id].ask, props[_id].status, props[_id].deposit,ads[_id].metadataURL );
    }
    
    
    
    function listAds(uint256 _prop_id) public view returns (uint256[]) {
        uint256[] memory outArray_ = new uint256[](8);
        uint count = 0;
        uint max = adCount+1;
        for (uint i=1; i<max;i++) {
            if (ads[i].prop_id == _prop_id) {
                outArray_[count] = i;
                count = count+1;
            }
        }   
        return (outArray_);
    }
    
   
    
   
  
  
  
}
