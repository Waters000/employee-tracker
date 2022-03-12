const inquirer = require('inquirer');
const Manager = require("./Manager")
//const Intern = require("./Intern")
//const Engineer = require("./Engineer")
class Employee {
    constructor(firstname, lastname, roleid, managerid) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.roleid = roleid;
        this.managerid = managerid;
    }
   
}