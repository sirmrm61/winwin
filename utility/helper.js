var crypto = require("crypto");
var jwt = require('jsonwebtoken');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lWhzfr4';

var helper = {
    isInt: (paraVar) => {
        try {
            parseInt(paraVar);
            console.log(paraVar);
            return true;
        } catch {
            return false;
        }
    },
    hashMd5: function (data) {
        return crypto.createHash("md5").update(data).digest("hex").toString();
    },
    encrypt: (text) => {
        const iv = crypto.randomBytes(16)
        console.log(typeof (iv));
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
        return {
            iv: iv.toString('hex'),
            content: encrypted.toString('hex')
        }
    },
    decrypt: (hash) => {
        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'))

        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])

        return decrpyted.toString()
    },
    getToken: async (payload) => {
        payload.iat = Math.floor(Date.now() / 1000) - 30;
        payload.expiresIn = Math.floor(Date.now() / 1000) + (60 * 60);
        var token = await jwt.sign(payload, secretKey);
        return token;
    },
    decryptToken: async (token) => {
        try {
            var dt = await jwt.verify(token, secretKey);
            return dt;
        } catch {
            return null;
        }
    }

}
module.exports = helper;