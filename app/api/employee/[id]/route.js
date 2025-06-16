// Using App Router
import { getEmployeeById, deleteEmployeeById, updateEmployee } from "@/controller/employee/employee";

export async function GET(request, { params }) {
    const { id } = params;
    return getEmployeeById(id);
}


export async function DELETE(request, { params }) {
    const { id } = params;
    return deleteEmployeeById(id);
}


export async function PUT(request, { params }) {
    const { id } = params;
    return updateEmployee(request, id);
}