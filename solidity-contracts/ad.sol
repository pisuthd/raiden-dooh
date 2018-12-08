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
    
    function createAd(address _owner, string _title, string _image_url) public {
        adCount = adCount + 1;
        ads[adCount].owner = _owner;
        ads[adCount].title = _title;
        ads[adCount].image_url = _image_url;
        
    }
    
    function getAd(uint256 _ad_id) public view returns (address, string, string) {
        return (ads[_ad_id].owner, ads[_ad_id].title, ads[_ad_id].image_url);
    } 
    
    function listAd(uint offset ,address owner) public view returns (uint256[]) {
        uint256[] memory outArray_ = new uint256[](8);
        uint count = 0;
        uint max = adCount+1;
        for (uint i=offset+1; i<max;i++) {
            if (ads[i].owner == owner) {
                outArray_[count] = i;
                count = count+1;
            }
        }   
        return (outArray_);
    }
    
    
    
    




}