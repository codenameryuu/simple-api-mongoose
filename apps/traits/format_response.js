class FormatResponse {
  sendResponse = (result, res) => {
    let data = null;
    let statusCode = 200;

    if (result.data) {
      data = result.data;
    }

    if (!result.status) {
      statusCode = 422;
    }

    res.status(statusCode).send({
      status: result.status,
      message: result.message,
      data: data,
    });
  };
}

module.exports = FormatResponse;
