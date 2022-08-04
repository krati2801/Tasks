const randomstring = require("randomstring");
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.ENCRYPTION_SALT_ROUNDS);

class EncryptionHandler {

    generateAuthToken() {
        return this.bcrypt(randomstring.generate(25));
    }

    bcrypt(data) {
        return bcrypt.hashSync(data.toString(), bcrypt.genSaltSync(saltRounds), null);
    }

    compareBcrypt(entity, encryptEntity) {
        return bcrypt.compareSync(entity, encryptEntity);
    }
}

module.exports = EncryptionHandler