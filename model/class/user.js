'use strict';
const { Sequelize,DataTypes, Model } = require('sequelize');
class user extends Model {
    static init(connection){
        console.log(connection);
        super.init({
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
                }}
            , {
                connection,
                modelName: 'user', // We need to choose the model name
                tableName: 'user'
            }
        )
    }
}




// async function initUser(connection) {
//     return new Promise(async resolve => {
//         user.init({
//             idUser: {
//                 type: DataTypes.UUID,
//                 primaryKey: true,
//                 allowNull: false,
//                 defaultValue: Sequelize.UUIDV4
//             },
//             tronWallet: {
//                 type: DataTypes.STRING
//             },
//             createDate: {
//                 type: DataTypes.DATE
//             },
//             lastLogin: {
//                 type: DataTypes.DATE
//             }
//         }, {
//             // Other model options go here
//             sequelize: connection, // We need to pass the connection instance
//             modelName: 'user', // We need to choose the model name
//             tableName: 'user'
//         });
//         await user.sync({ alter: true });
//         // the defined model is the class itself
//         resolve();
//     })

// }
// var useres = {
//     init: initUser,
//     class: user,
//     className: "user"
// }
module.exports = user
