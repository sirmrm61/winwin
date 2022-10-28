const { DataTypes, Model } = require('sequelize');
class country extends Model {}
async function initCountry(connection) {
    return new Promise(async resolve => {
        country.init({
            idCountry: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            titleCountry: {
                type: DataTypes.STRING
            },
            countryLogo: {
                type: DataTypes.STRING
            }
        }, {
            // Other model options go here
            sequelize: connection, // We need to pass the connection instance
            modelName: 'country', // We need to choose the model name
            tableName: 'country'
        });
        await country.sync({ alter: true });
        // the defined model is the class itself
        resolve();
    })

}
var counteries = {
    init: initCountry,
    class: country,
    className: "country"
}
module.exports = counteries
