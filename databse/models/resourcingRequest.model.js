//import datatypes from sequelize
const {DataTypes}=require("sequelize")

//import bcryptjs
const bcryptjs=require("bcryptjs")

//import sequelize
const {sequelize}=require("../db.config")

exports.ResourcingRequests=sequelize.define("resourcing_requests",{
    request_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },raised_by:{
        type:DataTypes.STRING
    },
    resource_role:{
        type:DataTypes.STRING,
        allowNull:false
    },
    no_of_resources:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    freezeTableName:true,
    createdAt:false,
    updatedAt:false
})

