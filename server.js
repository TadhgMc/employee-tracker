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
                'View all Employees', 'Add a new Employee', 'Update an existing Employee',
                'View all Employees in a Department', 'Add a new Department',
                'View all Employees in a Role', 'Add a new Role',
            ],
        })
        .then((answer) => {
            switch(answer.action){
                case 'View all Employees':
                    viewAllEmployees();
                    break;
                case 'Add a new Employee':
                    getEmpRoleData();
                    break;
                case 'Update an existing Employee':
                    updateEmployee(); //needs made
                    break;
                case 'View all Employees in a Department' :
                    getDeptData(); 
                    break;
                case 'Add a new Department' :
                    addDept();
                    break;
                case 'View all Employees in a Role' :
                    getViewRoleData();
                    break;
                case 'Add a new Role' :
                    getDeptRoleData();
                    break;
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


const getEmpRoleData = () => {
    let query = 'select roles.role_id, roles.title from roles;';
    connection.query(query, (err,res) => {
        if(err) console.log('error: ', err);

        roleArray = res.map((data) => (data.title));
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
            choices: roleArray
            },          
        ])
        .then((answer) => {
            console.log(answer);
            let query = `INSERT INTO employee(first_name, last_name, role_id)
            VALUES('${answer.first_name}', '${answer.last_name}', (select roles.role_id from roles where roles.title = '${answer.role_id}'));`
            connection.query(query, (err,res) =>{
                if(err) console.log('error: ', err);
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
            console.log(answer);
            let query = `INSERT INTO department(department)
            VALUES("${answer.dptName}");`;
            connection.query(query, (err,res) => {
                console.log('195 response: ', res)
                if(err) console.log('195 error: ', err)
            })
            somethingClever();
        })
};

const getViewRoleData = () => {
    let getRoles = 'select * from roles';
    let roleArray;
    connection.query(getRoles, (err,res) => {
        if(err) console.log('198 error: ', err);
        roleArray = res.map((data) => data.title);
        console.log('roleArray: ', roleArray);
        viewByRole(roleArray);
    })
}
const viewByRole = (roleArray) => {
    console.log('roles: ', roleArray);
    inquirer
        .prompt(
            {
            name: 'role',
            type: 'list',
            message: 'Which Role would you like to search for?',
            choices: roleArray
            }
        )
        .then((answer) => {
            console.log('answer: ',answer);
            let query = `select employee.first_name, employee.last_name, roles.salary, department.department
            from employee join (roles join department using(department_id)) using(role_id)
            where roles.title = ? ;`
            connection.query(query, answer.role, (err, res) => {
                let table = cTable.getTable(res);
                console.log('\n', table);
                if(err) console.log(' 243 error: ', err)
            })
            somethingClever();
        })
};


const getDeptRoleData = () => {
    let getDept = 'select * from department';
    let deptArray;
    connection.query(getDept, (err,res) => {
        if(err) console.log(err);

        deptArray = res.map((data) =>
            data.department
        );
        console.log(deptArray);
        addRole(deptArray);
    });
};
const addRole = (deptArray) => { 
    inquirer
        .prompt([
            {
                name: 'newRoleTitle',
                type: 'input',
                message: `what is the title of the Role you'd like to add?`,
            },
            {
                name: 'salary',
                type: 'input',
                message: `What will this role's starting salary be?`
            },
            {
                name: 'rolesDept',
                type: 'list',
                message: 'Which Department will this Role be part of?',
                choices: deptArray,
            }
        ])
        .then((answer) => {
            console.log(answer);
            let query = `INSERT INTO roles(title,salary,department_id)
            VALUES( "${answer.newRoleTitle}", ${answer.salary}, 
            (select department.department_id from department where department.department = "${answer.rolesDept}"));`;

            connection.query(query, (err,res) => {
                console.log(res);
                if(err) console.log('282 error: ', err);
            })
            somethingClever()
        });
};


