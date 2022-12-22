import knexObj from 'knex';
import dotenv from 'dotenv'

dotenv.config();

const knex = knexObj({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'qlkh2'
    },
    pool: {
        min: 0,
        max: 10
    }
});

export default knex;