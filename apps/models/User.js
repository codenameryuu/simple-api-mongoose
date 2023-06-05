const mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate-v2");

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
    select: false,
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

ProductSchema.virtual("image_url").get(function () {
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
