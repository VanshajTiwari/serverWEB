//SPDX-License-Identifier:MIT
pragma solidity ^0.8.13;

contract FileShare {
    struct File {
        string hash;       // IPFS hash
        string description;
    }

    File[] files;

    function addFile(string memory _hash, string memory _description) public {
        File memory newFile = File({
            hash: _hash,
            description: _description
        });
        files.push(newFile);
    }

    function getFile(uint index) public view returns (string memory, string memory) {
        return (files[index].hash, files[index].description);
    }

    function getFileCount() public view returns (File[] memory) {
        return files;
    }
}
