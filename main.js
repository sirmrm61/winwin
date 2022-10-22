const express = require('express')
const path = require('path');
const app = express()
const port = 3000
const userPage = require('./controller/user');
const dbConnection = require('./db');
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
dbConnection.initDB().then((msg) => {
  console.log(msg);
  app.listen(port, () => {
    console.log(`App listening at port ${port}`)
  })
  console.log(msg);
});