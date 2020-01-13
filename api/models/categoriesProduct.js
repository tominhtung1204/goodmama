const mongoose = require("mongoose");

const categoryProductSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  children: [
    {
      title: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

categoryProductSchema.virtual("product", {
  ref: "Product",
  localField: "_id",
  foreignField: "category"
});

categoryProductSchema.set("toObject", { virtuals: true });
categoryProductSchema.set("toJSON", { virtuals: true });

const categoryProduct = mongoose.model(
  "categoryProduct",
  categoryProductSchema
);

module.exports = categoryProduct;
