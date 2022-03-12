const inquirer = require('inquirer');
const cTable = require('console.table')



const db = require("./db/connection")


function basicInfo() {
  
    inquirer.prompt([
  
      {
        type: 'list',
        name: 'position',
        message: 'Select a Response',
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        validate: RoleInput => {
          if (RoleInput) {
            return true;
          } else {
            console.log('Please select a Position!');
            return false;
          }
        }
      },
  
    ])
      .then(responses => {
        if (responses.position === "view all departments") {
       // console.log("get departments")
       
        const sql = `SELECT * FROM department`          
        db.query(sql, (err, result) => {
          if (err)
            throw err
            console.table(result)  
          basicInfo()
        });
      
        
  
        
        } else if (responses.position === "view all roles") {
          console.log("show all roles")
          const sql = `SELECT * FROM role`          
          db.query(sql, (err, result) => {
            if (err)
              throw err
              console.table(result)  
            basicInfo()
          });


        } else if (responses.position === "view all employees") {
          const sql = `SELECT * FROM employee`          
        db.query(sql, (err, result) => {
          if (err)
            throw err
            console.table(result)  
          basicInfo()
        });
        }
        else if (responses.position === "add a department") {
          inquirer.prompt([
            {
              type: 'input',
              name: 'department',
              message: "What is the name of the department?",
              validate:  department => {
                if (department) {
                  return true;
                } else {
                  console.log("Please enter the Department Name")
                  return false;
                }
              }
            }
          ])
            .then(response => {
              const internMember = new Intern(responses.name, responses.employeeid, responses.emailAddress, responses.position, response.school)
              internMembers.push(internMember)
              console.log(internMember)
              moreUsers()
            })
        }
        else if (responses.position === "add a role") {
          inquirer.prompt([
            {
              type: 'input',
              name: 'rolename',
              message: "What is the name of the new Role?",
              validate:  rolename => {
                if (rolename) {
                  return true;
                } else {
                  console.log("Please enter the Role Name")
                  return false;
                }
              }
            },
            {
              type: 'input',
              name: 'rolesalary',
              message: "What is the salary of the new Role?",
              validate:  rolesalary => {
                if (rolesalary) {
                  return true;
                } else {
                  console.log("Please enter the Role Salary")
                  return false;
                }
              }
            },
            {
              type: 'input',
              name: 'roledepartment',
              message: "What is the Department of the new Role?",
              validate:  roledepartment => {
                if (roledepartment) {
                  return true;
                } else {
                  console.log("Please enter the Role Department")
                  return false;
                }
              }
            }
          ])
            .then(response => {
              const internMember = new Intern(responses.name, responses.employeeid, responses.emailAddress, responses.position, response.school)
              internMembers.push(internMember)
              console.log(internMember)
              moreUsers()
            })
        }

        else if (responses.position === "add an employee") {
          inquirer.prompt([
            {
              type: 'input',
              name: 'employeeFirst',
              message: "What employee's first name?",
              validate:  employeeFirst => {
                if (employeeFirst) {
                  return true;
                } else {
                  console.log("Please enter employee's first name.")
                  return false;
                }
              }
            },
            {
              type: 'input',
              name: 'employeeLast',
              message: "What employee's last name?",
              validate:  employeeLast => {
                if (employeeLast) {
                  return true;
                } else {
                  console.log("Please enter employee's last name.")
                  return false;
                }
              }
            },
            {
              type: 'input',
              name: 'employeeRole',
              message: "What employee's Role?",
              validate:  employeeRole => {
                if (employeeRole) {
                  return true;
                } else {
                  console.log("Please enter employee's role.")
                  return false;
                }
              }
            },
            {
              type: 'input',
              name: 'employeeManager',
              message: "Whom is the employee's manager?",
              validate:  employeeManager => {
                if (employeeManager) {
                  return true;
                } else {
                  console.log("Please enter employee's manager.")
                  return false;
                }
              }
            }
          ])
            .then(response => {
              const internMember = new Intern(responses.name, responses.employeeid, responses.emailAddress, responses.position, response.school)
              internMembers.push(internMember)
              console.log(internMember)
              moreUsers()
            })
        }

        else if (responses.position === "update an employee role") {
          inquirer.prompt([
            {
              type: 'input',
              name: 'updateEmployee',
              message: "Which employee do you want to update?",
              validate:  schoolInput => {
                if (schoolInput) {
                  return true;
                } else {
                  console.log("Please enter the School Name")
                  return false;
                }
              }
            }
          ])
            .then(response => {
              const internMember = new Intern(responses.name, responses.employeeid, responses.emailAddress, responses.position, response.school)
              internMembers.push(internMember)
              console.log(internMember)
              moreUsers()
            })
        }
      }); /// end of first inqurier with basic questions.
  
  };
  
  
  
  /// ask if user wants to add more employees or stop
  function moreUsers() {
    inquirer.prompt([
      {
          type:'confirm',
          name: 'moreEmployees',
          message:'Do you want to add more Employees?',
          default: false
      }
  ])
    .then(moreResponse => {
      if (moreResponse.moreEmployees === true){
      basicInfo();
      } else {
             writeFile(managerMembers, engineerMembers, internMembers)
      }
    })
  }
  
  
  
  
  basicInfo()
  