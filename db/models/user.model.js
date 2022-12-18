const { Sequelize, DataTypes, Model } = require('sequelize');
const helper = require('./../../utility/helper')
module.exports = (sequelize) => {
    sequelize.define('user', {
        idUser: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        tronWallet: {
            type: DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING,
            allowNull:true,
            set(value){
                this.setDataValue('password',helper.hashMd5(value))
            }
        }
        ,
        createDate: {
            type: DataTypes.DATE,
            defaultValue:Sequelize.fn('NOW')
        },
        lastLogin: {
            type: DataTypes.DATE,
            defaultValue:Sequelize.fn('NOW')
        }
    }
    );
    sequelize.sync({ alter: true });
};
