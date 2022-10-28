const { DataTypes, Model } = require('sequelize');
class league extends Model {}
async function initLeague(connection) {
    return new Promise(async resolve => {
      league.init({
            idLeague: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            titleLeague: {
                type: DataTypes.STRING
            },
            logoLeague: {
                type: DataTypes.STRING
            },
            idCountry: {
              type:DataTypes.INTEGER
            }
        }, {
            // Other model options go here
            sequelize: connection, // We need to pass the connection instance
            modelName: 'league', // We need to choose the model name
            tableName: 'league'
        });
        await league.sync({ alter: true });
        // the defined model is the class itself
        resolve();
    })

}
var leagues = {
    init: initLeague,
    class: league,
    className: "league"
}
module.exports = leagues

