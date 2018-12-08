pragma solidity ^0.4.24;

contract task {

    struct Task {
        uint256 screen_id; 
        uint256 ad_id; 
        uint256 bid;
        // put expire date
    }

    mapping(uint256 => Task) tasks;
    
    uint256 private taskCount = 0;

    function numTask() public view returns (uint256) {
        return taskCount;
    }
    
    function createTask(uint256 _screen_id, uint256 _ad_id, uint256 _bid) public {
        taskCount = taskCount +1;
        tasks[taskCount].screen_id = _screen_id;
        tasks[taskCount].ad_id = _ad_id;
        tasks[taskCount].bid = _bid;
    }
    
    function getTask(uint256 _task_id) public view returns (uint256 , uint256, uint256) {
        return (tasks[_task_id].screen_id,tasks[_task_id].ad_id, tasks[_task_id].bid);
    }
    
    
    
    function deleteTask(uint256 _id) public {
        delete tasks[_id];
    }


}