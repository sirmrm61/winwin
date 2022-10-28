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
            type: DataTypes.DATE
        },
        lastLogin: {
            type: DataTypes.DATE
        }
    }
        );
        sequelize.sync({alter:true});
};
