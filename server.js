const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: '',
});
connection.connect((err) => {
    if (err) throw err;
    somethingClever();
    //main function goes here
});


    // first prompt: what would you like to do
    // options: view all employees & view all by (department/roles), 
    // (add/remove/update) employee, departments, roles

//create main function here
const somethingClever = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all Employees', 'Add a new Employee', 'Update an existing Employee', 'Remove an Employee',
                'View all Employees in a specific Department', 'Add a new Department', 'Remove a Department',
                'View all Employees in a specific Role', 'Add a new Role', 'Remove a Role',
            ],
        })
        .then((answer) => {
            switch(answer.action){
                case 'View all Employees':
                    viewAllEmployees(); //needs made
                    break;
                case 'Add a new Employee':
                    addEmployee(); //needs made
                    break;
                case 'Update an existing Employee':
                    updateEmployee(); //needs made
                    break;
                case 'Remove an Employee':
                    removeEmployee(); //needs made
                    break;
                case 'View all Employees in a specific Department' :
                    viewByDept(); //needs made
                    break;
                case 'Add a new Department' :
                    addDept(); //needs made
                    break;
                case 'Remove a Department' :
                    removeDept(); //needs made
                    break;
                case 'View all Employees in a specific Role' :
                    viewByRole(); //needs made
                    break;
                case 'Add a new Role' :
                    addRole(); //needs made
                    break;
                case 'Remove a Role' :
                    removeRole(); //needs made
                    break;
                default:
                    console.log(`theres been an issue: ${answer}`);
                    break;
            }

        }); //end of then

}; //end of somethingClever()