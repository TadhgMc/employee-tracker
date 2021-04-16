const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'EmployeeDB',
});

connection.connect((err) => {
    if (err) throw err;
    somethingClever();
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
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View all Employees', 'Add a new Employee', 'Update an existing Employee', /*'Remove an Employee',*/
                'View all Employees in a Department', 'Add a new Department', /*'Remove a Department',*/
                'View all Employees in a Role', 'Add a new Role', /*'Remove a Role',*/
            ],
        })
        .then((answer) => {
            switch(answer.action){
                case 'View all Employees':
                    viewAllEmployees();
                    break;
                case 'Add a new Employee':
                    getRoleData(); //needs made
                    break;
                case 'Update an existing Employee':
                    updateEmployee(); //needs made
                    break;
                // case 'Remove an Employee':
                //     removeEmployee(); //needs made
                //     break;
                case 'View all Employees in a Department' :
                    getDeptData(); 
                    break;
                case 'Add a new Department' :
                    addDept(); //needs made
                    break;
                // case 'Remove a Department' :
                //     removeDept(); //needs made
                //     break;
                case 'View all Employees in a Role' :
                    viewByRole(); //needs made
                    break;
                case 'Add a new Role' :
                    addRole(); //needs made
                    break;
                // case 'Remove a Role' :
                //     removeRole(); //needs made
                //     break;
                default:
                    console.log(`theres been an issue: ${answer}`);
                    break;
            }

        }); //end of then

}; //end of somethingClever()

const viewAllEmployees = () => {
    let query = 'select employee.first_name, employee.last_name, roles.title, roles.salary, department.department';
    query += ' from employee join (roles join department using(department_id))';
    query += ' using(role_id);';
    connection.query(query, (err,res) => { 
        let table = cTable.getTable(res);
        console.log('\n', table);
        if (err) console.log(err);
    })
    somethingClever();
};

const getRoleData = () => {
    let query = 'select roles.role_id, roles.title from roles;';
    connection.query(query, (err,res) => {
        if(err) console.log('error: ', err);

        roleArray = res.map((data) => ({title: data.title, role_id: data.role_id}));
        console.log(res);
        console.log('data: ', roleArray);
        addEmployee(roleArray);
    });
};
const addEmployee = (roleArray) => {
    console.log("roleArray: ", (roleArray));

    inquirer
        .prompt([
            {
            name: 'first_name',
            type: 'input',
            message: "What is the new Employee's first name?",
            },
            {
            name: 'last_name',
            type: 'input',
            message: "What is the new Employee's last name",
            },
            {
            name: 'role_id',
            type: 'list',
            message: `Please choose this Employee's role:`,
            choices: (roleArray.title),
            },          
        ])
        .then((answer) => {
            console.log(answer);
            let query = `INSERT INTO employee(first_name, last_name, role_id) 
            VALUES ('${answer.first_name}','${answer.last_name}', ${answer.role_id});`
            connection.query(query, (err,res) =>{
                if(err) console.log(err);
                console.log(res);
                console.log('finished');
            })
            somethingClever();
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

// const removeEmployee = () => {
//     inquirer
//         .prompt({
//             //
//         })
//         .then((answer) => {
//             // end with run somethingClever()
//         })
// };

//begin dapartment functions

//view by whole dept
const getDeptData = () => {
    let getDept = 'select * from department';
    let deptArray;
    connection.query(getDept, (err,res) => {
        if(err) console.log(err);

        deptArray = res.map((data) =>
            data.department
        );
        console.log(deptArray);
        viewByDept(deptArray);
    });
}
const viewByDept = (deptArray) => {
    
    console.log(deptArray);
    inquirer
        .prompt(
            {
            name: 'dept',
            type: 'list',
            message: 'Which Department would you like to search for?',
            choices: deptArray
            }
        )
        .then((answer) => {
            console.log(answer);
            let query = 'select employee.first_name, employee.last_name, roles.title, roles.salary '
            query += 'from employee join (roles join department using(department_id)) using(role_id)'
            query += 'where department.department = ? ;'
            connection.query(query, answer.dept, (err,res) => {
                let table = cTable.getTable(res);
                console.log('\n', table);
                if (err) console.log(err);
            });
            somethingClever();
        });

};


const addDept = () => {
    inquirer
        .prompt(
            {
            name: 'dptName',
            type: 'input',
            message: `Please enter the name of the department you'd like to add`,
            },
        )
        .then((answer) => {
            // end with run somethingClever()
        })
};

// const removeDept = () => {
//     // const deptArray = await getDeptData();
//     inquirer
//         .prompt({
//             //
//         })
//         .then((answer) => {
//             // end with run somethingClever()
//         })
// };

const viewByRole = () => {
    inquirer
        .prompt({
            //
        })
        .then((answer) => {
            // end with run somethingClever()
        })
};

// may need a couple prompts for this depending on if I want to make preset roles with special info ||
// || something special that notices if someone is a manager, if so, ask/make id for manager
const addRole = () => { 
    inquirer
        .prompt({
            //
        })
        .then((answer) => {
            // end with run somethingClever()
        })
};

// const removeRole = () => {
//     inquirer
//         .prompt({
//             //
//         })
//         .then((answer) => {
//             // end with run somethingClever()
//         })
// };

