// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract ContractManager {
    address public owner;
    mapping(address => string) private contractDescriptions;
    address[] private contractAddresses;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyExistingContract(address _contractAddress) {
        require(isContractRegistered(_contractAddress), "Contract not registered");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function isContractRegistered(address _contractAddress) public view returns (bool) {
        for (uint i = 0; i < contractAddresses.length; i++) {
            if (contractAddresses[i] == _contractAddress) {
                return true;
            }
        }
        return false;
    }

    function addContract(address _contractAddress, string memory _description) external onlyOwner {
        require(!isContractRegistered(_contractAddress), "Contract already registered");
        contractAddresses.push(_contractAddress);
        contractDescriptions[_contractAddress] = _description;
    }

    function updateDescription(address _contractAddress, string memory _newDescription) external onlyOwner onlyExistingContract(_contractAddress) {
        contractDescriptions[_contractAddress] = _newDescription;
    }

    function removeContract(address _contractAddress) external onlyOwner onlyExistingContract(_contractAddress) {
        for (uint i = 0; i < contractAddresses.length; i++) {
            if (contractAddresses[i] == _contractAddress) {
                contractAddresses[i] = contractAddresses[contractAddresses.length - 1];
                contractAddresses.pop();
                delete contractDescriptions[_contractAddress];
                break;
            }
        }
    }

    function getContractDescription(address _contractAddress) external view onlyExistingContract(_contractAddress) returns (string memory) {
        return contractDescriptions[_contractAddress];
    }

    function getAllContractAddresses() external view returns (address[] memory) {
        return contractAddresses;
    }
}
