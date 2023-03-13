//import sequelize
const { Sequelize } =require("sequelize");

//import environment variables
require("dotenv").config()

//create connection with database
exports.sequelize=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host:process.env.HOST,
        dialect:"mysql"
    }
)

// this.sequelize.sync({force:true})
// this.sequelize.sync({alter:true})
this.sequelize.sync()