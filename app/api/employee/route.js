// Using Page Router
// import nc from "next-connect";
// import { getAllEmployees } from "@/controller/employee/employee";

// const handler = nc();

// handler.get(getAllEmployees);

// export default handler;

// Using App Router

import { getAllEmployees, createEmployee, } from "@/controller/employee/employee";

export async function GET(req) {
    return getAllEmployees(); // No req, res — Next.js handles it differently
}

export async function POST(req) {
    return createEmployee(req);
}


