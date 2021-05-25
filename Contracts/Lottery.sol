// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.17;

contract Lottery {
    address public manager;
    address payable[] public players;
    
    constructor(){
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        
        players.push(payable(msg.sender));
    }
    
    function random() private view returns (uint) {
        return uint(sha256( abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
    
    function pickWinner() public restricted{
        
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        
        // Reset players list 
        players = new address payable[](0);
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns (address payable[] memory){
        return players;
    }
}

