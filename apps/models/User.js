const mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate-v2");
const softDelete = require("mongoosejs-soft-delete");

const path = require("path");
const fs = require("fs");

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: true,
  },
  image: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

UserSchema.virtual("image_url").get(function () {
  return process.env.APP_BASE_URL + "/storage/images/users/" + this.image;
});

UserSchema.post("save", function (data, next) {
  if (!data.created_at) {
    data.created_at = Date.now();
  }

  data.updated_at = Date.now();
  data.save();
  next();
});

UserSchema.methods.toJSON = function () {
  let data = this.toObject();
  delete data.password;
  return data;
};

UserSchema.methods.saveImage = function (req) {
  if (req.files && Object.keys(req.files).length !== 0) {
    const file = req.files.image;
    const rootPath = path.dirname(require.main.filename);

    const extName = path.extname(file.name);
    const fileName =
      Date.now() + Math.random().toString(10).slice(2, 7) + extName;
    const filePath = rootPath + "/public/storage/images/user/";

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    fs.copyFile(file.path, filePath + fileName, function (err) {
      return null;
    });

    return fileName;
  }
};

UserSchema.methods.deleteImage = function () {
  const rootPath = path.dirname(require.main.filename);
  const filePath = rootPath + "/public/storage/images/user/" + this.image;

  fs.unlink(filePath, (err) => {});
};

mongoose.plugin((schema) => {
  const setting = {
    versionKey: false,
    transform(doc, ret) {
      delete ret.id;
      delete ret.deleted;
    },
  };

  schema.options.toJSON = setting;
  schema.options.toObject = setting;
});

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(softDelete);

module.exports = mongoose.model("User", UserSchema, "users");
