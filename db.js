const dotenv = require('dotenv');
const envConfig = dotenv.config();
const { Sequelize } = require("sequelize");
const countries = require('./Model/class/country');
const leagues = require('./Model/class/league');
const teames = require('./Model/class/team');
const useres = require('./Model/class/user');
var sequelize = null;
models=[
    // countries,
    // leagues,
    // teames,
    useres
]

// async function initClass(noClass, connection) {
//     return new Promise(async resolve => {
//         lengthList = preRequermentList.length;
//         await preRequermentList[noClass].init(connection()).then(async() => {
//             console.log(noClass + "\tinit\t" + preRequermentList[noClass].className);
//             if (noClass + 1 < lengthList) {
//                 await initClass(noClass + 1, connection)

//             }
//             resolve();

//         })
//     })
// }
var dbConnection = {
    connection:async ()=> {
        if (sequelize == null) {
            try {
                sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
                    host: process.env.DB_HOST,
                    port: process.env.DB_PORT,
                    dialect: process.env.dialect,
                    logging: false// (...msg) => console.log(msg)
                });
                console.log("Connection has been established successfully.");
            } catch (error) {
                console.error("Unable to connect to the database:", error);

            }
            return sequelize;
        } else
            return sequelize;
    },
    status: function() {
        if (sequelize == null) return 0;
        else return 1
    },
    close: function() {
        if (sequelize != null) sequelize.close();
        sequelize = null;
    },
    initDB: async function() {
        return new Promise(async resolve => {
            con=await this.connection();
            models.map(model =>async (m)=>{await m.init(await this.connection())});
            resolve('Database Created...!');
            // await initClass(0, this.connection).then(async() => {
            //      resolve('Database Created...!');
            // });
         })
    }
};

module.exports = dbConnection