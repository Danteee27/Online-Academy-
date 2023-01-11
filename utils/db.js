import knexObj from 'knex';
import dotenv from 'dotenv'
// import asyncErr from 'express-async-errors';

dotenv.config();

const knex = knexObj({
    client: 'mysql2',
    connection: {
        host: 'us-cdbr-east-06.cleardb.net',
        port: 3306,
        user: 'b93a85f0da66bc',
        password: 'c61b78f8',
        database: 'heroku_d41916e4c029680'
        // host: 'localhost',
        // port: 3306,
        // user: 'root',
        // password: 'root',
        // database: 'qlkh'

    },
    pool: {
        min: 0,
        max: 10
    }
});

export default knex;