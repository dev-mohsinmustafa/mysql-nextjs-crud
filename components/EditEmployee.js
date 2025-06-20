"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../styles/UpdateEmployee.module.css";
import Header from "./Header";
function EditEmployee({ employeeUpdateData }) {
    console.log("employeeid", employeeUpdateData);
    const router = useRouter();
    const [addEmployee, setEmployee] = useState({
        emp_name: "",
        emp_email: "",
        emp_address: "",
        emp_phone: "",
    });

    // Don't render until data is available
    if (!employeeUpdateData) return <p>Loading...</p>;
    useEffect(() => {
        setEmployee(employeeUpdateData);
    }, [employeeUpdateData]);
    const onSubmit = async (e) => {
        e.preventDefault();
        let data = await axios.put(
            `http://localhost:3000/api/employee/${employeeUpdateData.emp_id}`,
            addEmployee
        );
        if (data.data) router.push("/employees");
        setEmployee({
            emp_name: "",
            emp_email: "",
            emp_address: "",
            emp_phone: "",
        });
    };

    const handleChange = (e) => {
        const value = e.target.value;
        console.log("value", value);
        setEmployee({ ...addEmployee, [e.target.name]: value });
    };
    return (
        <>
            <Header />
            <div className={styles.addform}>
                <h1>EDIT EMPLOYEE</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            type="text"
                            className={styles.input}
                            name="emp_name"
                            placeholder="Enter Name"
                            onChange={handleChange}
                            value={addEmployee.emp_name}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            className={styles.input}
                            name="emp_email"
                            placeholder="Enter Email"
                            onChange={handleChange}
                            value={addEmployee.emp_email}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className={styles.input}
                            name="emp_address"
                            placeholder="Enter Address"
                            onChange={handleChange}
                            value={addEmployee.emp_address}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className={styles.input}
                            name="emp_phone"
                            placeholder="Enter Phone"
                            onChange={handleChange}
                            value={addEmployee.emp_phone}
                        />
                    </div>
                    <div>
                        <button type="submit" className={styles.button}>
                            Submit
                        </button>
                        <button className={styles.button}>
                            <Link href={`/employees`}>Go Back</Link>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditEmployee;