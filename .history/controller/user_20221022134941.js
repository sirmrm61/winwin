var express = require('express');
const { Op } = require("sequelize");
var wallet_Validator = require('wallet-validator');
const useres=require('../model/class/user')
var router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.post('/sign-in',async  (req, res) => {
    var uname = req.body.tronWalletAddress;
    var valid = wallet_Validator.validate(uname, 'tron');
    console.log(req.body.tronWalletAddress);
    if (valid){
        var us=await useres.findAll({attributes: ['idUser', 'tronWallet']});//({where:{tronWallet:req.body.tronWalletAddress}});
        if(user == null || user == undefined ){
            //useres.class.create()
        }else
        console.log(user);
        res.render('pages/profile/home');

    }
    else
        res.render('pages/error/addressNotValid')
    console.log(req.body);
})
//this method use validate wallet address befor submit form 
router.post('/api/validate/wallet-address', (req, res) => {
    var uname = req.body.tronWalletAddress;
    var valid = wallet_Validator.validate(uname, 'tron');
    if (valid)
        res.status(200).send({status:200,msg:"Address Is Valid"});
    else
    res.status(200).send({status:401,msg:"Address Is Not Valid"});
    console.log(req.body);
})
module.exports = router;