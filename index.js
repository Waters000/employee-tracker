const inquirer = require('inquirer');
const cTable = require('console.table')



const db = require("./db/connection");
const { fetchAsyncQuestionProperty } = require('inquirer/lib/utils/utils');


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
              const sql=`INSERT INTO department (name) VALUES (?)`
             db.query(sql, response.department, (err, result) =>{
               if (err)
               throw err
               console.table(result);
               basicInfo()
             })
            })
        }
        else if (responses.position === "add a role") {
          inquirer.prompt([
            {
              type: 'input',
              name: 'title',
              message: "What is the name of the new Role?",
              validate:  title => {
                if (title) {
                  return true;
                } else {
                  console.log("Please enter the Role Name")
                  return false;
                }
              }
            },
            {
              type: 'input',
              name: 'salary',
              message: "What is the salary of the new Role?",
              validate:  salary => {
                if (salary) {
                  return true;
                } else {
                  console.log("Please enter the Role Salary")
                  return false;
                }
              }
            },
            {
              type: 'input',
              name: 'department_id',
              message: "What is the Department of the new Role?",
              validate:  department_id => {
                if (department_id) {
                  return true;
                } else {
                  console.log("Please enter the Role Department")
                  return false;
                }
              }
            }
          ])
            .then(response => {
             const sql = `INSERT INTO role SET ?`;
             db.query(sql, response, (err, result) => {
               if (err)
               throw err
               console.log(result);
               basicInfo()
             })
            })
        }

        else if (responses.position === "add an employee") {
          inquirer.prompt([
            {
              type: 'input',
              name: 'first_name',
              message: "What employee's first name?",
              validate:  first_name => {
                if (first_name) {
                  return true;
                } else {
                  console.log("Please enter employee's first name.")
                  return false;
                }
              }
            },
            {
              type: 'input',
              name: 'last_name',
              message: "What employee's last name?",
              validate:  last_name => {
                if (last_name) {
                  return true;
                } else {
                  console.log("Please enter employee's last name.")
                  return false;
                }
              }
            },
            {
              type: 'input',
              name: 'role_id',
              message: "What employee's Role?",
              validate:  role_id => {
                if (role_id) {
                  return true;
                } else {
                  console.log("Please enter employee's role.")
                  return false;
                }
              }
            },
            {
              type: 'input',
              name: 'manager_id',
              message: "Whom is the employee's manager?",
              validate:  manager_id => {
                if (manager_id) {
                  return true;
                } else {
                  console.log("Please enter employee's manager.")
                  return false;
                }
              }
            }
          ])
            .then((response) => {
             const sql = `INSERT INTO employee SET ?`;
             db.query(sql, response,(err, result) =>{
               if (err)
               throw err
               console.log(result);
               basicInfo()
             })
            })
        }

        else if (responses.position === "update an employee role") {
          inquirer.prompt([
            {
              type: 'input',
              name: 'employee',
              message: "Which employee ID do you want to update?",
              validate:  employee => {
                if (employee) {
                  return true;
                } else {
                  console.log("Please enter employee by ID")
                  return false;
                }
              }
            },
            {
              type: 'input',
              name: 'role_id',
              message: "What is the employee's new role by ID?",
              validate:  role_id => {
                if (role_id) {
                  return true;
                } else {
                  console.log("Please enter employee new role by ID.")
                  return false;
                }
              }
            }
          ])
            .then((response) => {
             const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
             db.query(sql,[response.role_id, response.employee], (err, result) =>{
               if (err)
               throw err
               console.table(result);
               basicInfo()
             })
            })
        }
      }); /// end of first inqurier with basic questions.
  
  };
  
  
  

  
  
  
  basicInfo()
  