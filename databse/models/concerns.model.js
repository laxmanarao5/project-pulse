//import datatypes from sequelize
const {DataTypes}=require("sequelize")

//import bcryptjs
const bcryptjs=require("bcryptjs")

//import sequelize
const {sequelize}=require("../db.config")

exports.Concerns=sequelize.define("concerns",{
    concern_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
    },
    description:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    raised_by:{
        type:DataTypes.STRING,
        allowNull:false
    },
    raised_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    severity:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    raised_by_client:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mitigated_on_date:{
        type:DataTypes.DATE,
        allowNull:true
    }
},{
    freezeTableName:true,
    createdAt:false,
    updatedAt:false
})