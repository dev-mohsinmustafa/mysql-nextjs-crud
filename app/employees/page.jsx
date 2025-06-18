// Using App Router
import EmployeeList from '@/components/EmployeeList';
import React from 'react';

async function getEmployees() {
    const res = await fetch("http://localhost:3000/api/employee", {
        cache: "no-store", // prevent stale data
    });
    const data = await res.json();
    return data;
}

export default async function EmployeesPage() {
    const data = await getEmployees();

    return (
        <div>
            <h1>Employees</h1>
            <EmployeeList employeeData={data} />
        </div>
    );
}



// Using Page Router
// import EmployeeList from '@/components/EmployeeList/EmployeeList'
// import React from 'react'

// function Employees({ data }) {
//     console.log("data", data);
//     return (
//         <div>
//             <h1>Employees</h1>
//             <EmployeeList employeeData={data} />
//         </div>
//     )
// }

// export async function getServerSideProps() {
//     const res = await fetch("http://localhost:3000/api/employee");
//     const data = await res.json();
//     return {
//         props: {
//             data
//         }
//     }
// }

// export default Employees;