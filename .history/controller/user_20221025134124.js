var express = require('express');
const { Op } = require("sequelize");
var wallet_Validator = require('wallet-validator');
const {models}=require('./../db')
var router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.post('/sign-in',async  (req, res) => {
    var uname = req.body.tronWalletAddress;
    var valid = wallet_Validator.validate(uname, 'tron');
    if (valid){
        var user=await models.user.findAll({where:{tronWallet:req.body.tronWalletAddress}});
        if(user == undefined ||user == null || user.length ==0 ){
            user=await models.user.create({tronWallet:req.body.tronWalletAddress});
            console.log("create user:"+user);
            res.render('pages/profile/home');
        }else
        res.render('pages/profile/home');
    }
    else
        res.render('pages/error/addressNotValid')
})
//this method use validate wallet address befor submit form 
router.post('/api/validate/wallet-address', (req, res) => {
    var uname = req.body.tronWalletAddress;
    var valid = wallet_Validator.validate(uname, 'tron');
    if (valid)
        res.status(200).send({status:200,msg:"Address Is Valid"});
    else
    res.status(200).send({status:401,msg:"Address Is Not Valid"});
})
module.exports = router;