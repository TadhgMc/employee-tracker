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

// function that acts as main hub of app
const somethingClever = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View all Employees', 'Add a new Employee', `Update an existing Employee's Role`,
                'View all Employees in a Department', 'Add a new Department',
                'View all Employees in a Role', 'Add a new Role', 'End',
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
                case `Update an existing Employee's Role`:
                    getEmployeeRoleData();
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
                case 'End' :
                    connection.end();
                    break;
                default:
                    console.log(`theres been an issue: ${answer}`);
                    break;
            }

        }); //end of then

}; //end of somethingClever()

// function to view all Employees
const viewAllEmployees = () => {
    let query = `select employee.first_name, employee.last_name, roles.title, roles.salary, department.department
     from employee join (roles join department using(department_id))
     using(role_id);` ;
    connection.query(query, (err,res) => { 
        let table = cTable.getTable(res);
        console.log('\n', table, '\n');
        if (err) console.log(err);
    });
    somethingClever();
};

// function to add a new Employee
const getEmpRoleData = () => {
    let query = 'select roles.role_id, roles.title from roles;';
    connection.query(query, (err,res) => {
        if(err) console.log('error: ', err);
        roleArray = res.map((data) => (data.title));
        addEmployee(roleArray);
    });
};
const addEmployee = (roleArray) => {
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
            let query = `INSERT INTO employee(first_name, last_name, role_id)
            VALUES('${answer.first_name}', '${answer.last_name}', (select roles.role_id from roles where roles.title = '${answer.role_id}'));`;
            connection.query(query, (err,res) =>{
                if(err) console.log('error: ', err);
                console.log('finished');
            });
            somethingClever();
        });
};


// function to update an Employee's Role
const getEmployeeRoleData = async () => {

    let employeeName,roleTitles;
    const queryEmp = `select concat(employee.first_name, " ", employee.last_name) as employee_name from employee;`;
    const queryRole = `select roles.title from roles;`;

    await connection.query(queryEmp, (err,res) => {
        if(err) console.log('133 error: ', err);
        employeeName = res.map((data) => (data.employee_name));
    });
    await connection.query(queryRole, (err,res) => {
        roleTitles = res.map((data) => (data.title));
        updateEmployeeRole(employeeName, roleTitles);
    });
};
const updateEmployeeRole = (employeeName, roleTitles) => {
    inquirer
        .prompt([
            {
                name: 'employee',
                type: 'list',
                message: 'Which Employee is being reassigned?',
                choices: employeeName
            },
            {
                name: 'newRole',
                type: 'list',
                message: `What is this Employee's new Role?`,
                choices: roleTitles
            }
        ])
        .then((answer) => {
            const empFirLast = answer.employee.split(' ');
            let query = `
            update employee 
            set role_id = (select roles.role_id from roles where roles.title = "${answer.newRole}") 
            where employee_id = 
            (select employee.employee_id where employee.first_name = "${empFirLast[0]}" and employee.last_name = "${empFirLast[1]}");
            `;
            connection.query(query, (err,res) => {
                if(err) console.log('167 error: ', err);
                console.log('finished');
            });
            somethingClever();
        });
};


// function to view all Employees by Department
const getDeptData = () => {
    let getDept = 'select * from department';
    let deptArray;
    connection.query(getDept, (err,res) => {
        if(err) console.log(err);
        deptArray = res.map((data) =>
            data.department
        );
        viewByDept(deptArray);
    });
}
const viewByDept = (deptArray) => {
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
            let query = `select employee.first_name, employee.last_name, roles.title, roles.salary 
            from employee join (roles join department using(department_id)) using(role_id)
            where department.department = ? ;` ;
            connection.query(query, answer.dept, (err,res) => {
                let table = cTable.getTable(res);
                console.log('\n', table, '\n');
                if (err) console.log(err);
            });
            somethingClever();
        });

};

// function to add a new Department
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
            let query = `INSERT INTO department(department)
            VALUES("${answer.dptName}");`;
            connection.query(query, (err,res) => {
                console.log('finished');
                if(err) console.log('195 error: ', err);
            });
            somethingClever();
        });
};

// function to view all Employees by Role
const getViewRoleData = () => {
    let getRoles = 'select * from roles';
    let roleArray;
    connection.query(getRoles, (err,res) => {
        if(err) console.log('198 error: ', err);
        roleArray = res.map((data) => data.title);
        viewByRole(roleArray);
    });
};
const viewByRole = (roleArray) => {
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
            let query = `select employee.first_name, employee.last_name, roles.salary, department.department
            from employee join (roles join department using(department_id)) using(role_id)
            where roles.title = ? ;`;
            connection.query(query, answer.role, (err, res) => {
                let table = cTable.getTable(res);
                console.log('\n', table, '\n');
                if(err) console.log(' 243 error: ', err);
            })
            somethingClever();
        });
};

// function to add new Role
const getDeptRoleData = () => {
    let getDept = 'select * from department';
    let deptArray;
    connection.query(getDept, (err,res) => {
        if(err) console.log(err);
        deptArray = res.map((data) =>
            data.department
        );
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
            let query = `INSERT INTO roles(title,salary,department_id)
            VALUES( "${answer.newRoleTitle}", ${answer.salary}, 
            (select department.department_id from department where department.department = "${answer.rolesDept}"));`;
            connection.query(query, (err,res) => {
                if(err) console.log('282 error: ', err);
                console.log('Finished!');
            });
            somethingClever();
        });
};