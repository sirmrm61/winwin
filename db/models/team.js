const { DataTypes, Model } = require('sequelize');
class team extends Model {}
async function initTeam(connection) {
    return new Promise(async resolve => {
        team.init({
            idTeam: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            nameTeam: {
                type: DataTypes.STRING
            },
            logoTeam: {
                type: DataTypes.STRING
            },
            keyTeam: {
                type: DataTypes.INTEGER
            }
        }, {
            // Other model options go here
            sequelize: connection, // We need to pass the connection instance
            modelName: 'team', // We need to choose the model name
            tableName: 'team'
        });
        await team.sync({ alter: true });
        // the defined model is the class itself
        resolve();
    })

}
var teames = {
    init: initTeam,
    class: team,
    className: "team"
}
module.exports = teames
