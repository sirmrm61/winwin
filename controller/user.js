var express = require('express');
const { Op } = require("sequelize");
var wallet_Validator = require('wallet-validator');
const helper = require('../utility/helper');
const { models } = require('./../db')
var router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
//this method use for sign in user
router.post('/sign-in', async (req, res) => {
    var uname = req.body.tronWalletAddress;
    var valid = wallet_Validator.validate(uname, 'tron');
    if (valid) {
        var user = await models.user.findAll({ where: { tronWallet: req.body.tronWalletAddress } });
        if (user == undefined || user == null || user.length == 0) {
            user = await models.user.create({ tronWallet: req.body.tronWalletAddress });
            console.log("create user:" + user);
            res.render('pages/profile/home', { security: "test", twa: req.body.tronWalletAddress });
        } else {
            dt = user[0].dataValues;
            if (dt.password == undefined || dt.password == null)
                res.render('pages/profile/home', { security: "test", twa: req.body.tronWalletAddress });
            else {
                hash = helper.encrypt(dt.tronWallet)
                //res.render('pages/pass', { addr: hash.iv, user: hash.content });
                res.redirect('/pass?addr=' + hash.iv + '&user=' + hash.content);
            }
        }
    }
    else
        res.render('pages/error/addressNotValid')
})
router.get('/pass', async (req, res) => {
    res.render('pages/pass', { addr: req.query.addr, user: req.query.user });
})
//this method use for checkpassword
router.post('/checkpassword', async (req, res) => {
    var pass = req.body.Password;
    var iv = req.query.addr;
    var content = req.query.user
    uname = helper.decrypt({ iv: iv, content: content });
    var valid = wallet_Validator.validate(uname, 'tron');
    if (valid) {
        var user = await models.user.findAll({
            where: {
                tronWallet: uname,
                password: pass
            }
        });
        console.log(user);
        if (user == undefined || user == null || user.length == 0) {
            res.redirect('/worngpassword');
        } else {
            token = await helper.getToken({ userWallet: uname, role: 'public' });

            res.redirect('/profile?token=' + token);
        }
    }
})
router.get('/worngpassword', (req, res) => {
    res.render('pages/worngpassword');
});
router.get('/profile', async (req, res) => {
    if (req.query.token != undefined && req.query.token != null) {
        uname = await helper.decryptToken(req.query.token);
        if (uname != null) {
            res.render('pages/profile/home', { security: "test", twa: uname.userWallet });
        }
        else res.redirect('/errorUname');
    } else
        res.redirect('/errorToken');
})
//this method use validate wallet address befor submit form 
router.post('/api/validate/wallet-address', (req, res) => {
    var uname = req.body.tronWalletAddress;
    var valid = wallet_Validator.validate(uname, 'tron');
    if (valid)
        res.status(200).send({ status: 200, msg: "Address Is Valid" });
    else
        res.status(200).send({ status: 401, msg: "Address Is Not Valid" });
})
module.exports = router;