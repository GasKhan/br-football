import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const dbPool = mysql
  .createPool({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'br_football',
  })
  .promise();

const getAwards = async () => {
  const awards = await dbPool.query(`
    SELECT * FROM award_types;
    `);
  console.log(awards);
};

getAwards();
