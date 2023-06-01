class FormatResponse {
  validate = (error, res) => {
    if (error) {
      res.send({
        status: false,
        message: error.msg,
        data: null,
      });
    }
  };

  sendResponse = (result, res) => {
    res.send({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  };
}

module.exports = FormatResponse;
