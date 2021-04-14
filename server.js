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

//
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

const viewAllEmployees = () => {
    inquirer
        .prompt({
            //display all employees here w/ console.table
        })
        .then((answer) => {
            // end with run somethingClever()
        })
};

const addEmployee = () => {
    inquirer
        .prompt(
            {
            name: 'firstname',
            type: 'input',
            message: "What is the new Employee's first name?",
            },
            {
            name: 'lastname',
            type: 'input',
            message: "What is the new Employee's last name"
            },
            {
            name: 'role_id',
            type: 'list',
            message: `Please choose this Employee's role:`,
            choices: [],
            },
            {
            name: 'manager_id',
            type: 'list',
            message: `Please choose this Employee's manager`,
            choices: []
            }            
        )//role then manager
        .then((answer) => {
            //may not need to pass 'answer' or anything into the function
            // end with run somethingClever()
        })
};

const updateEmployee = () => {
    inquirer
        .prompt(
            {
            //need to add code here to get data from req.params(?) and add that data to the DB
            }
        )
        .then((answer) => {
            // end with run somethingClever()
        })
};

const removeEmployee = () => {
    inquirer
        .prompt({
            //
        })
        .then((answer) => {
            // end with run somethingClever()
        })
};

const viewByDept = () => {
    inquirer
        .prompt({
            //
        })
        .then((answer) => {
            // end with run somethingClever()
        })
};

const addDept = () => {
    inquirer
        .prompt({
            //
        })
        .then((answer) => {
            // end with run somethingClever()
        })
};

const removeDept = () => {
    inquirer
        .prompt({
            //
        })
        .then((answer) => {
            // end with run somethingClever()
        })
};

const viewByRole = () => {
    inquirer
        .prompt({
            //
        })
        .then((answer) => {
            // end with run somethingClever()
        })
};

const addRole = () => {
    inquirer
        .prompt({
            //
        })
        .then((answer) => {
            // end with run somethingClever()
        })
};

const removeRole = () => {
    inquirer
        .prompt({
            //
        })
        .then((answer) => {
            // end with run somethingClever()
        })
};