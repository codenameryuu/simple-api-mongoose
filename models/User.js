const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama tidak boleh kosong"],
    },
    age: {
      type: Number,
      required: [true, "Umur tidak boleh kosong"],
    },
    status: {
      type: String,
      enum: ["active", "non active"],
      default: ["non active"],
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
