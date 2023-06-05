const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const User = require("../../Models/User");

class AuthService {
  // * Login service
  login = async (req) => {
    try {
      const user = await User.findOne({
        email: req.fields.email,
      });

      await bcrypt
        .compare(req.fields.password, user.password)
        .then(function (status) {
          const result = {
            status: false,
            message: "Incorrect password !",
          };

          return result;
        });

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtSecretKey,
        {}
      );

      const result = {
        status: true,
        message: "Data created successfully !",
        data: user,
        token: token,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // * Register service
  register = async (req) => {
    try {
      const user = new User();

      user.name = req.fields.name;
      user.email = req.fields.email;
      user.password = await bcrypt.hash(req.fields.password, 10);

      const filename = user.saveImage(req);

      if (filename) {
        user.image = filename;
      }

      await user.save();

      const userResult = await User.findOne({
        _id: user.id,
      });

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtSecretKey,
        {}
      );

      const result = {
        status: true,
        message: "Data created successfully !",
        data: userResult,
        token: token,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = AuthService;
