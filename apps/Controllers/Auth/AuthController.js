const AuthValidation = require("../../Validations/Auth/AuthValidation");
const authValidation = new AuthValidation();

const AuthService = require("../../Services/Auth/AuthService");
const authService = new AuthService();

const FormatResponse = require("../../Traits/FormatResponse");
const formatResponse = new FormatResponse();

class AuthController {
  // * Login
  login = async (req, res) => {
    const validation = await authValidation.login(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await authService.login(req);

    formatResponse.sendResponse(result, res);
  };

  // * Register
  register = async (req, res) => {
    const validation = await authValidation.register(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await authService.register(req);

    formatResponse.sendResponse(result, res);
  };
}

module.exports = AuthController;
