// // import React, { useState, useEffect } from 'react'

// function EmployeeList(props) {
//     console.log("Employees console props", props.employeeData);
//     // const [employees, setEmployees] = useState([]);

//     // useEffect(() => {
//     //     getAllEmployees();
//     // }, [])

//     // const getAllEmployees = async () => {
//     //     const response = await fetch("http://localhost:3000/api/employee")
//     //     const data = await response.json();
//     //     console.log("Mohsin console data", data);
//     //     setEmployees(data);
//     // }

//     return (
//         <>
//             <div>EmployeeList Hello Employees</div>
//             {/* {employees.map((employee) => {
//                 return (
//                     <div key={employee.emp_id}>
//                         <p>Employee ID: {employee.emp_id}</p>
//                         <p>Employee Name: {employee.emp_name}</p>
//                     </div>
//                 )

//             }
//             )} */}
//         </>
//     )
// }

// export default EmployeeList


"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../styles/EmployeeList.module.css";
import axios from "axios";
import Header from "../Header";
function EmployeeList({ employeeData }) {
    const router = useRouter();
    const deleteEmployee = async (id) => {
        let data = await axios.delete(`http://localhost:3000/api/employee/${id}`);
        // router.push("/employees");
        router.refresh();
    };
    return (
        <>
            <Header />
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th className={styles.th}>EmployeeId</th>
                        <th className={styles.th}>EmployeeName</th>
                        <th className={styles.th}>EmployeeEmail</th>
                        <th className={styles.th}>EmployeeAddress</th>
                        <th className={styles.th}>EmployeePhone</th>
                        <th className={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {employeeData.map((empData, index) => (
                        <tr key={index}>
                            <th className={styles.th}>{index + 1}</th>
                            <td className={styles.th}>{empData.emp_name}</td>
                            <td className={styles.th}>{empData.emp_email}</td>
                            <td className={styles.th}>{empData.emp_address}</td>
                            <td className={styles.th}>{empData.emp_phone}</td>
                            <td>
                                <button
                                    className={styles.delete}
                                    onClick={() => deleteEmployee(empData.emp_id)}
                                >
                                    Delete
                                </button>
                                <button className={styles.update}>
                                    <Link href={`/employee/${empData.emp_id}`}>Update</Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.addEmployeeCenter}>
                <button className={styles.addEmployee}>
                    <Link href={`/addEmployee`}>AddEmployee</Link>
                </button>
            </div>
        </>
    );
}

export default EmployeeList;