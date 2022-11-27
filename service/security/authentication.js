var jwt = require("jsonwebtoken");
require("dotenv").config();
var auth = {
  login: (username,ip, ui) => {
    var token = jwt.sign({role:1, username: username, ip: ip, ui: ui,
        exp:Math.floor(Date.now() / 1000) + (60  * parseInt(process.env.expireTime ))
    }, process.env.secretKey);
    return token;
  },
  decodeToken:(token)=>{
    var decoded = jwt.verify(token, process.env.secretKey);
    console.log(decoded)
  }
};
module.exports = auth;