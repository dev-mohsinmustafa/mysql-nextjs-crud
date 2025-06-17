import dotenv from 'dotenv';
dotenv.config();

const express = require('express');
const { executeQuery } = require('./config/db');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

app.use(express.json()); // Middleware to parse JSON requests

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests


app.get('/employees', async (req, res) => {
    try {
        let employeeData = await executeQuery("SELECT * FROM employee", []);
        res.json(employeeData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/employees/:id', async (req, res) => {
    const emp_id = req.params.id;
    try {
        let employeeData = await executeQuery("SELECT * FROM employee WHERE emp_id =?", [emp_id]);
        res.json(employeeData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/createEmployee', async (req, res) => {
    const { emp_name, emp_email, emp_address, emp_phone } = req.body;
    try {
        let employeeData = await executeQuery("INSERT INTO employee (emp_name, emp_email, emp_address, emp_phone) VALUES (?, ?, ?, ?)", [emp_name, emp_email, emp_address, emp_phone]);
        res.json(employeeData);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})