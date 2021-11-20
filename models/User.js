const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create User model
class User extends Model { }

// define table columns and configuration
User.init(
    {
        // DEFINE ID COLUMN
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        // DEFINE USER COLUMN
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // DEFINE EMAIL COLUMN
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        
        // DEFINE PASSWORD COLUMN
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [4]}
        }
    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);