const express = require('express')
const path = require('path');
const app = express()
const port = 3000
const userPage = require('./controller/user');
const sequelize = require('./db');
app.set('view engine', 'ejs')
app.use(express.json())
const user = {
  firstName: 'Tim',
  lastName: 'Cook',
  admin: true,
}
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
)
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
)
app.use(
  "/wv",
  express.static(path.join(__dirname, "node_modules/wallet-validator/src"))
)
app.use("/user/js", express.static(path.join(__dirname, "views/asset/js")))
app.get('/', (req, res) => {
  res.render('pages/index', {
    user
  })
})
app.use('', userPage);

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
}
async function init() {
  await assertDatabaseConnectionOk();
  app.listen(process.env.appPort, () => {
    console.log(`Express server started on port ${process.env.appPort}. Try some routes, such as '/api/users'.`);
  })
}
console.log(process.env.DB_USERNAME);
init();