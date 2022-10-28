const { Sequelize, DataTypes, Model } = require('sequelize');
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
