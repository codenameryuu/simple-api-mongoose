const User = require("../../models/User");

class UserService {
  index = async (req, res) => {
    try {
      const user = await User.find();

      const result = {
        status: true,
        message: "Data berhasil diambil!",
        data: user,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  store = async (req, res) => {
    try {
      const user = new User();

      user.name = req.body.name;
      user.age = req.body.age;
      user.status = req.body.status;

      await user.save();

      const result = {
        status: true,
        message: "Data berhasil diambil!",
        data: user,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = UserService;
