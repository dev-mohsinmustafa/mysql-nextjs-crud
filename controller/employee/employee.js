
// Using Page Router
// const getAllEmployees = async (req, res) => {
//     res.send("Hello World");
//   };

//   export { getAllEmployees };



// Using App Router
import employeeValidator from "@/common/employeeValidator";
import ErrorHandler from "@/common/errorHandler";
import { executeQuery } from "@/config/db";

// Fetch all employees
const getAllEmployees = async () => {
    try {
        let employeeData = await executeQuery("SELECT * FROM employee", [])
        console.log("employeeData", employeeData);
        return new Response(JSON.stringify(employeeData), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
};

// Fetch a single employee by ID
const getEmployeeById = async (id) => {
    try {
        // let employeeData = await executeQuery(`SELECT * FROM employee WHERE emp_id = ${id}`, [])
        // 🔒 SQL Injection Prevention
        // Use parameterized queries like this:
        let employeeData = await executeQuery("SELECT * FROM employee WHERE emp_id = ?", [id])
        console.log("employeeData", employeeData);
        // After ErrorHanlder implementation
        if (employeeData.length === 0) {
            // next(new ErrorHandler(`No Employee id found with this id${id}`, 404))
            return new Response(JSON.stringify({ message: `No employee found with ID: ${id}` }), { status: 404 });
        }
        return new Response(JSON.stringify(employeeData), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

const deleteEmployeeById = async (id) => {
    try {
        let employeeData = await executeQuery("DELETE FROM employee WHERE emp_id =?", [id])
        console.log("employeeData", employeeData);
        return new Response(JSON.stringify(employeeData), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}


const createEmployee = async (req) => {
    try {
        const result = await req.json(); // get body from Request.
        const { emp_name, emp_email, emp_address, emp_phone } = result;
        const { error } = employeeValidator(result);
        if (error) {
            return new Response(JSON.stringify({ message: error.details[0].message }), { status: 400 });
        } else {
            let employeeData = await executeQuery("INSERT INTO employee (emp_name, emp_email, emp_address, emp_phone) VALUES (?, ?, ?, ?)", [emp_name, emp_email, emp_address, emp_phone])
            let employeeId = employeeData.insertId;
            employeeData = await executeQuery("SELECT * FROM employee WHERE emp_id =?", [employeeId])
            console.log("employeeData POST API=>():", employeeData);
            return new Response(JSON.stringify(employeeData), { status: 200 });
        }

    }
    catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }

}

const updateEmployee = async (req, id) => {
    try {
        const body = await req.json(); // get body from Request
        const { emp_name, emp_email, emp_address, emp_phone } = body;
        let employeeData = await executeQuery("UPDATE employee SET emp_name = ?, emp_email = ?, emp_address = ?, emp_phone = ? WHERE emp_id = ?", [emp_name, emp_email, emp_address, emp_phone, id])
        console.log("employeeData", employeeData);
        const updatedEmployee = await executeQuery("SELECT * FROM employee WHERE emp_id =?", [id]);
        return new Response(JSON.stringify(updatedEmployee), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

export { getAllEmployees, getEmployeeById, deleteEmployeeById, createEmployee, updateEmployee };
