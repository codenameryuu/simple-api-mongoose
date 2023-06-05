const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const softDelete = require("mongoosejs-soft-delete");

const Schema = mongoose.Schema;

let ProductCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
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

ProductCategorySchema.virtual("product", {
  ref: "Product",
  localField: "_id",
  foreignField: "product_category_id",
  justOne: false,
});

ProductCategorySchema.pre("find", function () {
  const { withDeleted } = this.options;

  if (withDeleted) {
    delete this.getFilter().deleted;
  }
});

ProductCategorySchema.pre("findOne", function () {
  const { withDeleted } = this.options;

  if (withDeleted) {
    delete this.getFilter().deleted;
  }
});

ProductCategorySchema.post("save", function (data, next) {
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
      delete ret.deleted;
    },
  };

  schema.options.toJSON = setting;
  schema.options.toObject = setting;
});

ProductCategorySchema.plugin(mongoosePaginate);
ProductCategorySchema.plugin(softDelete);

module.exports = mongoose.model(
  "ProductCategory",
  ProductCategorySchema,
  "product_categories"
);
