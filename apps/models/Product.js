const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
  return "oke";
});

ProductSchema.virtual("product_category", {
  ref: "ProductCategory",
  localField: "product_category_id",
  foreignField: "_id",
  justOne: false,
});

ProductSchema.pre("find", function () {
  this.populate({ path: "product_category", options: { withDeleted: true } });
});

ProductSchema.post("save", function (data, next) {
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
