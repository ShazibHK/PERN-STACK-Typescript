import {Sequelize} from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();


const Database = new Sequelize("PernProduct","postgres","Test@123" ,{
    host: process.env.HOST,
    dialect:"postgres",
    pool: {
      max: 9,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  
  Database.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err: string) => console.log('Error: ' + err))

  export default Database

  
