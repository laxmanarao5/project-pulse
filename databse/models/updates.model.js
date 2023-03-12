//import datatypes from sequelize
const {DataTypes}=require("sequelize")

//import bcryptjs
const bcryptjs=require("bcryptjs")

//import sequelize
const {sequelize}=require("../db.config")

exports.Updates=sequelize.define("updates",{
    update_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    project_status:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    shedule_status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    resourcing_status:{
        type:DataTypes.STRING,
        allowNull:true
    },
    quality_status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    waiting_for_client_inputs:{
        type:DataTypes.BOOLEAN,
    }
},{
    freezeTableName:true,
    createdAt:false,
    updatedAt:false
})

