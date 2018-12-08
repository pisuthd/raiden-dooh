pragma solidity ^0.4.24;

contract task {

    struct Task {
        uint256 publisher_id; 
        uint256 ad_id; 
        uint256 bid;
        // put expire date
    }

    mapping(uint256 => Task) tasks;
    
    uint256 private taskCount = 0;

    function numTask() public view returns (uint256) {
        return taskCount;
    }


}