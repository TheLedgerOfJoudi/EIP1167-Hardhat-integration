//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import './Setter.sol';
import './CloneFactory.sol';
contract Factory is CloneFactory{
    address public setter;
    address public owner;
    address [] public clones;

    constructor(address _setter){
        owner = msg.sender;
        setter = _setter;
    }

    function createNewSetter() public
    {
        require (msg.sender == owner);
        address newSetter = createClone(setter);
        clones.push(newSetter);
    }

    function getSetter (uint index) public view returns(address){
        return clones[index];
    }

}