class FormatResponse {
  sendResponse = (req, res) => {
    let data = null;
    let statusCode = 200;

    if (req.data) {
      data = req.data;
    }

    if (!req.status) {
      statusCode = 422;
    }

    let result = {
      status: req.status,
      message: req.message,
      data: data,
    };

    if (req.token) {
      result.token = req.token;
    }

    res.status(statusCode).send(result);
  };
}

module.exports = FormatResponse;
