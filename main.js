//----import----
const express = require('express');
const mysql = require('mysql2/promise');
const  {Sequelize,DataTypes}  = require("sequelize");
//----end import----
const app = express();

let db; 
const sequelize = new Sequelize(
    'Pets',
    'root',
    'example',
    {
        host: 'localhost',
        port:3306,
        dialect:'mysql'
    }
)
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 const Book = sequelize.define("books", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    release_date: {
      type: DataTypes.DATEONLY,
    },
    subject: {
      type: DataTypes.INTEGER,
    }
 });
 sequelize.sync().then(() => {
    console.log('Book table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
async function go(){
    db = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user:'root',
        password:'example',
        database:'Pets'
    })
    app.listen(3000)
}

go()

app.get('/',async (req,res)=>{
    const [users] = await db.execute('SELECT * FROM Users');
    console.log(users)
    res.send(`<h1>Hello! Welcome.</h1>`)
})
