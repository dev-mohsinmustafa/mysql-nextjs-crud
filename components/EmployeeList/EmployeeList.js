"use client";
import React, { useState, useEffect } from 'react'

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getAllEmployees();
    }, [])

    const getAllEmployees = async () => {
        const response = await fetch("http://localhost:3000/employee")
        const data = await response.json();
        setEmployees(data);
    }

    return (
        <>
            <div>EmployeeList</div>
            {employees.map((employee) => {
                return (
                    <div key={employee.emp_id}>
                        <p>Employee ID: {employee.emp_id}</p>
                        <p>Employee Name: {employee.emp_name}</p>
                    </div>
                )

            }
            )}
        </>
    )
}

export default EmployeeList