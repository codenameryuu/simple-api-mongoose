const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/simple_api_mongoose", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", () => {
  console.log("server database connect");
});
