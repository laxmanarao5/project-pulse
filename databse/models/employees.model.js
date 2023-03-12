//import datatypes from sequelize
const {DataTypes}=require("sequelize")

//import bcryptjs
const bcryptjs=require("bcryptjs")

//import sequelize
const {sequelize}=require("../db.config")

exports.Employees=sequelize.define("employees",{
    emp_id:{
            type:DataTypes.INTEGER,
            primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false
    },
    start_date:{
        type:DataTypes.DATE,
        allowNull:true
    },
    end_date:{
        type:DataTypes.DATE,
        allowNull:true
    },
    status:{
        type:DataTypes.BOOLEAN,
    },
    billing_status:{
        type:DataTypes.STRING
    },
    exposed_to_customer:{
        type:DataTypes.BOOLEAN
    },
    allocation_type:{
        type:DataTypes.STRING
    }
},{
    freezeTableName:true,
    createdAt:false,
    updatedAt:false
})

