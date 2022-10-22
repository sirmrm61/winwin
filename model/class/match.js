const { DataTypes, Model } = require('sequelize');
class match extends Model {}
async function initMatch(connection) {
    return new Promise(async resolve => {
        match.init({
            idMatch: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            dateMatch: {
                type: DataTypes.DATE
            },
            timeMatch: {
                type: DataTypes.STRING
            },
            teamHostLogo: {
                type: DataTypes.STRING
            },
            teamHostName: {
                type: DataTypes.STRING
            }
            ,
            hostGoal: {
                type: DataTypes.INTEGER
            },
            teamGuestLogo: {
                type: DataTypes.STRING
            },
            teamGuestName: {
                type: DataTypes.STRING
            },
            guestGoal: {
                type: DataTypes.INTEGER
            },
            LeagueName: {
                type: DataTypes.STRING
            }
        }, {
            // Other model options go here
            sequelize: connection, // We need to pass the connection instance
            modelName: 'match', // We need to choose the model name
            tableName: 'match'
        });
        await match.sync({ alter: true });
        // the defined model is the class itself
        resolve();
    })

}
var counteries = {
    init: initMatch,
    class: match,
    className: "match"
}
module.exports = counteries
