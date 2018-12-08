pragma solidity ^0.4.24;

contract screen {

    struct Screen {
        uint256 publisher_id; 
        string title;
        uint timeStamp;
        uint256 rate;
        int interval;
    }

    mapping(uint256 => Screen) screens;
    
    uint256 private screenCount = 0;

    
    function numScreen() public view returns (uint256) {
        return screenCount;
    }



}