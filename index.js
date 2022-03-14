const inquirer = require('inquirer');
const cTable = require('console.table')

const {getDepartment} = require("./routes/apiRoutes/departmentRoutes")
const {getRoles} = require("./routes/apiRoutes/roleRoutes")
const {getEmployees} = require("./routes/apiRoutes/employeeRoutes")




const db = require("./db/connection");
const employeesArray = [];
const roleArray = [];

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
       getDepartment()
       basicInfo()
        // const sql = `SELECT * FROM department`          
        // db.query(sql, (err, result) => {
        //   if (err)
        //     throw err
        //     console.table(result)  
        //   basicInfo()
        // });
      
        
        } else if (responses.position === "view all roles") {
            getRoles()
            basicInfo()
          //console.log("show all roles")
          // const sql = `SELECT * FROM role
          // LEFT JOIN department ON department.id = role.department_id`          
          // db.query(sql, (err, result) => {
          //   if (err)
          //     throw err
          //     result.forEach(({id})=>{
          //       roleArray.push(id,)
          //     }) 
          //   basicInfo()
          // });


        } else if (responses.position === "view all employees") {
          getEmployees()
          basicInfo()
        //   const sql = `SELECT * FROM employee
        //   LEFT JOIN role ON role.id = employee.role_id`          
        // db.query(sql, (err, result) => {
        //   if (err)
        //     throw err;
        //     console.table(result)
        //     result.forEach(({first_name})=>{
        //       employeesArray.push(first_name)
        //     })

        //     console.log(employeesArray)
        //   basicInfo()
        // });
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
               console.table("Department Added");
               getDepartment()
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
              message: "What is the department ID of the new Role?",
              validate:  department_id => {
                if (department_id) {
                  return true;
                } else {
                  console.log("Please enter the Department ID for the role")
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
               console.log("Role added to Table successful")
               console.table(result);
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
              message: "What employee's Role ID?",
              validate:  role_id => {
                if (role_id) {
                  return true;
                } else {
                  console.log("Please enter employee's role ID.")
                  return false;
                }
              }
            },
            {
              type: 'input',
              name: 'manager_id',
              message: "Whom is the employee's manager ID?",
              validate:  manager_id => {
                if (manager_id) {
                  return true;
                } else {
                  console.log("Please enter employee's manager ID.")
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
              type: 'list',
             name: 'employee',
              message: "Which employee do you want to update (Must first view employees and roles to load first)?",
              choices: employeesArray,
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
              type: 'list',
              name: 'title',
              message: "What is the employee's new role by ID?",
              choices: roleArray,
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
             const sql = `UPDATE employee SET first_name = ? WHERE id = ?`;
             db.query(sql,[response.first_name, response.id], (err, result) =>{
               if (err)
               throw err
               console.log("employee updated");
               console.table(result)
               viewRoles()
               basicInfo()
             })
            })
        }
      }); /// end of first inqurier with basic questions.
  
  };
  
 
  
        const viewRoles = () => {
        
          const sql = `SELECT * FROM employee
          LEFT JOIN role ON role.id = employee.role_id` 
         
          db.query(sql, (err, result) => {
            if (err)
              throw err
              console.table(result)  
            
           
            })  
         
        };
  
  basicInfo()
  