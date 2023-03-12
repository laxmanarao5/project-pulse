//import datatypes from sequelize
const {DataTypes}=require("sequelize")

//import bcryptjs
const bcryptjs=require("bcryptjs")

//import sequelize
const {sequelize}=require("../db.config")

exports.Project=sequelize.define("project",{
    project_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
    },
    project_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    client:{
        type:DataTypes.STRING,
        allowNull:false
    },
    client_account_manager:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:true
    },
    start_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    end_date:{
        type:DataTypes.DATE,
    },
    fitness_indicator:{
        type:DataTypes.STRING,
        allowNull:true
    },
    domain:{
        type:DataTypes.STRING
    },
    project_type:{
        type:DataTypes.STRING
    },
    gdo:{
        type:DataTypes.STRING
    },
    project_manager:{
        type:DataTypes.STRING
    }

},{
    freezeTableName:true
})