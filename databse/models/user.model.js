//import datatypes from sequelize
const {DataTypes}=require("sequelize")

//import bcryptjs
const bcryptjs=require("bcryptjs")

//import sequelize
const {sequelize}=require("../db.config")

exports.User=sequelize.define("user",{
    user_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(pass){
            let hashedPassword=bcryptjs.hashSync(pass,4)
            this.setDataValue("password",hashedPassword)
        }
    },
    role:{
        type:DataTypes.STRING,
        allowNull:true
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    freezeTableName:true
})