
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
    type: "postgres",
    host: "trumpet.db.elephantsql.com",
    port: 5432,
    username: "ysoxmkxd",
    password: "nfEH9GV1hVTFWVJ9oPMKUvIESZmgtF5E",
    database: "ysoxmkxd",
    entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    synchronize: true,
    logging: true
  })
  
  AppDataSource.initialize().then(() =>{
    console.log('Database connected successfully')
  }).catch((err)=>{
    console.log('yawa dey', err)
  })

  export default AppDataSource