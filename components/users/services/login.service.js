const UserSchema = require('../schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginServices {
   static async findUser(dto) {
      const user = await UserSchema.findOne({ username: dto.username });
      return user;
   }

   static async verifyPassword(textPassword, hashedPassword) {
      const verified = bcrypt.compareSync(textPassword, hashedPassword);
      return verified;
   }

   static generateToken(payload) {
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret_key', {
         expiresIn: process.env.JWT_EXP_TIME || '365d',
      });
      return 'Bearer ' + token;
   }
}

module.exports = LoginServices;
