
const UserService = require("../../services/user/user_service");
const userService = new UserService();

class UserController {
  index = async (req, res) => {
    const result = await userService.index();

    res.send({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  };

  store = async (req, res) => {
    const result = await userService.store(req);

    res.send({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  };
}

module.exports = UserController;
