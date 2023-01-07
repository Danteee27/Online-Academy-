import knexObj from 'knex';
import dotenv from 'dotenv'
// import asyncErr from 'express-async-errors';

dotenv.config();

const knex = knexObj({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: "root",
        database: 'qlkh'
    },
    pool: {
        min: 0,
        max: 10
    }
});

export default knex;