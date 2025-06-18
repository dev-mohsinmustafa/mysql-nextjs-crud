import EditEmployee from "@/components/EditEmployee";

async function getEmployee(id) {
    const res = await fetch(`http://localhost:3000/api/employee/${id}`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data[0]; // Since we expect a single employee
}

export default async function EditEmployeePage({ params }) {
    const employeeData = await getEmployee(params.id);

    return (
        <>
            <EditEmployee employeeUpdateData={employeeData} />
        </>
    );
}