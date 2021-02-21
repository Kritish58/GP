const LoginServices = require('./services/login.service');
const signupServices = require('./services/signup.service');

class Controllers {
   static async signup(req, res) {
      let STATUS;
      try {
         const dto = req.body;

         //* @VALIDATION */

         //*  @SERVICES
         const userExists = await signupServices.checkIfUsernameExists(dto.username);
         if (userExists) {
            STATUS = 400;
            throw new Error('username already registered');
         }

         await signupServices.createUser(dto);

         return res.status(201).json({ success: true, message: 'user created' });
      } catch (err) {
         return res.status(STATUS || 500).json({ success: false, message: err.message });
      }
   }
   static async login(req, res) {
      let STATUS;
      try {
         const dto = req.body;
         //* @SERVICES SECTION
         const user = await LoginServices.findUser(dto);
         if (!user) {
            STATUS = 404;
            throw new Error('user not found');
         }
         const passwordVerified = await LoginServices.verifyPassword(dto.password, user.password);
         if (!passwordVerified) {
            STATUS = 400;
            throw new Error('password does not match');
         }

         const token = LoginServices.generateToken({ user_id: user._id });
         return res.status(200).json({ success: true, message: 'login success', token });
      } catch (err) {
         return res.status(STATUS || 500).json({ success: false, message: err.message });
      }
   }
}

module.exports = Controllers;
