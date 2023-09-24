// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract USERS{
    struct userStruct{
        address pubkey;
        string firstName;
        string LastName;
        string Email;
        string password;
        string confirmPassword;
    }

    mapping(address=>userStruct) public users;
    userStruct[] public Allusers;
    // function getAlluser() public admin
    function createUser(string memory firstName,string memory LastName,string memory Email,string memory password,string memory confirmPassword) public {
        users[msg.sender].firstName=firstName;
        users[msg.sender].LastName=LastName;
        users[msg.sender].Email=Email;
        users[msg.sender].password=password;
        users[msg.sender].confirmPassword=confirmPassword;
        Allusers.push(users[msg.sender]);
    }
    function getAllusers() public view returns(userStruct[] memory){
            return Allusers;
    }
    function getUserDetails(address pubkey)public view returns(userStruct memory){
            return users[pubkey];
    }
}