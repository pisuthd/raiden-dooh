pragma solidity ^0.4.24;

contract screen {

    struct Screen {
        uint256 publisher_id; 
        string title;
        string secret;
        uint timeStamp;
        uint256 rate;
        int interval;
    }

    mapping(uint256 => Screen) screens;
    
    uint256 private screenCount = 0;

    
    function numScreen() public view returns (uint256) {
        return screenCount;
    }
    
    function registerScreen(uint256 _publisher_id, string _title, string _secret, uint256 _rate, int _interval) public {
        screenCount = screenCount +1;
        screens[screenCount].publisher_id = _publisher_id;
        screens[screenCount].title = _title;
        screens[screenCount].secret = _secret;
        screens[screenCount].rate = _rate;
        screens[screenCount].interval = _interval;
    }

    function getScreen(uint256 _id) public view returns (uint256, string, string, uint256, int) {
        return (screens[_id].publisher_id, screens[_id].title, screens[_id].secret, screens[_id].rate, screens[_id].interval);
    } 


}