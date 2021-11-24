const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create User model
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
    hooks: {
        async beforeCreate(newData) {
            newData.password = await bcrypt.hash(newData.password, 10);
            return newData;
        },
        async beforeUpdate(updatedData) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
            return updatedData;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});
module.exports = User;