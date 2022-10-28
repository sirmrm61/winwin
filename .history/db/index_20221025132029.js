const { Sequelize } = require('sequelize');
// const { applyExtraSetup } = require('./extra-setup'); relation config for model

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
	benchmark: true
    const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
	dialect: 'mysql',
    logging:(msg)=>{console.log(msg)},
    host:process.env.DB_HOST,
	port:process.env.DB_PORT
});

const modelDefiners = [
	require("./models/user.model"),
	// Add more models here...

];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
// applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;