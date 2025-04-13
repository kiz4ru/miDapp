// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint private storedValue;

    function set(uint _value) public {
        storedValue = _value;
    }

    function get() public view returns (uint) {
        return storedValue;
    }
}
