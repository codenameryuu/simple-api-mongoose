const mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

let ProductCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name can't be empty"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

ProductCategorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

ProductCategorySchema.pre("update", function () {
  this.constructor.update(
    { _id: this._id },
    { $set: { updatedAt: Date.now() } }
  );
});

ProductCategorySchema.pre("findOneAndUpdate", function () {
  this.constructor.update(
    { _id: this._id },
    { $set: { updatedAt: Date.now() } }
  );
});

ProductCategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("product_categories", ProductCategorySchema);
