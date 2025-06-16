// const { createPool } = require('mysql');
import mysql from 'mysql2';


const pool = mysql.createPool({
    // host: 'localhost',
    // user: 'root',
    // password: 'Mohsin1122@@',
    // port: 3306,
    // database: 'data',
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,

})

pool.getConnection((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database MySQL');
});


const executeQuery = (query, arrayParams) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, arrayParams, (err, data) => {
                if (err) {
                    console.log("error in executing the query", err);
                    reject(err);
                } else {
                    resolve(data);
                }

            })
        } catch (error) {
            reject(error);
        }


    }
    )
}


export { executeQuery };