const inquirer = require("inquirer");
const { Departments } = require("./Department");
const { Roles } = require("./Roles");
const { Employees } = require("./Employees");

function Start() {
    Start.prototype.begin = function () {
        inquirer
        .prompt({
            type: "list",
            message: "Would you like to make changes to your records?",
            name: "action",
            choices: ["Yes", "No"],
        })
        .then(({ action }) => {
            if (action === "Yes") {
              this.manage();
            } else {
              console.log("Bye!");
              return;
            }
          });
      };

      Start.prototype.manage = function () {
        inquirer
          .prompt({
            type: "list",
            message: "What would you like to edit?",
            name: "action",
            choices: [
              "View Departments",
              "View Roles",
              "View Employees",
              "Add Role",
              "Add Employee",
              "Update Employee Info",
            ],
          })
          .then(({ action }) => {
            if (action === "View Departments") {
              new Departments().viewDepartments();
              this.begin();
            } else if (action === "View Roles") {
              new Roles().viewRoles();
              this.begin();
            } else if (action === "View Employees") {
              new Employees().viewEmployees();
              this.begin();
            } else if (action === "Add Role") {
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "title",
                    message: `What is the role title?`,
                  },
                  {
                    type: "input",
                    name: "salary",
                    message: `What is the salary for this role?`,
                  },
                  {
                    type: "input",
                    name: "department_id",
                    message: `What is the role's department id`,
                  },
                ])
                .then(({ title, salary, department_id }) => {
                  new Roles().addRole(title, salary, department_id);
                  this.begin();
                });
            } else if (action === "Add Employee") {
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "first_name",
                    message: `What is the employee's first name?`,
                  },
                  {
                    type: "input",
                    name: "last_name",
                    message: `What is the employee's last name?`,
                  },
                  {
                    type: "input",
                    name: "role_id",
                    message: `Please provide this employee's role id:`,
                  },
                  {
                    type: "input",
                    name: "manager_id",
                    message: `Please provide this employee's manager id:`,
                  },
                ])
                .then(({ first_name, last_name, role_id, manager_id }) => {
                  new Employees().addEmployee(
                    first_name,
                    last_name,
                    role_id,
                    manager_id
                  );
                  this.begin();
                });
            }
            else if(action === "Update Employee Info") {
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "id",
                    message: `What is the employee's id?`,
                  },
                  {
                    type: "input",
                    name: "role_id",
                    message: `What is the employee's new role id?`,
                  },
                ])
                .then(({ id, role_id }) => {
                  new Employees().updateEmployeeRole(
                    role_id,
                    id
                  );
                  this.begin();
                });
            }
          });
      };
    }
    
    module.exports = { Start };
    