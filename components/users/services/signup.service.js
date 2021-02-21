const UserSchema = require('../schema');

class signupServices {
   static async checkIfUsernameExists(username) {
      try {
         const userExists = await UserSchema.findOne({ username });
         return userExists;
      } catch (err) {
         throw new Error(err);
      }
   }

   static async createUser(dto) {
      try {
         await UserSchema.create(dto);
      } catch (err) {
         throw new Error(err);
      }
   }
}

module.exports = signupServices;
