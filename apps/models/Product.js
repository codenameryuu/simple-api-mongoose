const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const path = require("path");
const fs = require("fs");

const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  product_category_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    required: false,
  },
  updated_at: {
    type: Date,
    required: false,
  },
});

ProductSchema.virtual("image_url").get(function () {
  return (
    process.env.APP_BASE_URL + "/public/storage/images/product/" + this.image
  );
});

ProductSchema.virtual("product_category", {
  ref: "ProductCategory",
  localField: "product_category_id",
  foreignField: "_id",
  justOne: true,
});

ProductSchema.pre("find", function () {
  this.populate({
    path: "product_category",
    options: { withDeleted: true },
  });
});

ProductSchema.pre("findOne", function () {
  this.populate({
    path: "product_category",
    options: { withDeleted: true },
  });
});

ProductSchema.post("save", function (data, next) {
  if (!data.created_at) {
    data.created_at = Date.now();
  }

  data.updated_at = Date.now();
  data.save();
  next();
});

ProductSchema.methods.saveImage = function (req) {
  if (req.files && Object.keys(req.files).length !== 0) {
    const file = req.files.image;
    const rootPath = path.dirname(require.main.filename);

    const extName = path.extname(file.name);
    const fileName =
      Date.now() + Math.random().toString(10).slice(2, 7) + extName;
    const filePath = rootPath + "/public/storage/images/product/";

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    fs.copyFile(file.path, filePath + fileName, function (err) {
      return null;
    });

    return fileName;
  }
};

ProductSchema.methods.deleteImage = function () {
  const rootPath = path.dirname(require.main.filename);
  const filePath = rootPath + "/public/storage/images/product/" + this.image;

  fs.unlink(filePath, (err) => {});
};

mongoose.plugin((schema) => {
  const setting = {
    versionKey: false,
    virtuals: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    transform(doc, ret) {
      delete ret.id;
    },
  };

  schema.options.toJSON = setting;
  schema.options.toObject = setting;
});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", ProductSchema, "products");
