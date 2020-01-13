const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  slug: {
    type: String,
    require: true
  },
  shortDescription: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: Array,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  oldPrice: {
    type: Number
  },
  hotProduct: {
    type: Boolean,
    default: false
  },
  newProduct: {
    type: Boolean,
    default: true
  },
  saleProduct: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "categoryProduct"
  },
  productCode: {
    type: String,
    require: true
  },
  color: {
    type: String
  },
  size: [
    {
      name: {
        type: String
      },
      price: {
        type: String
      }
    }
  ],
  count: [
    {
      name: {
        type: String
      },
      price: {
        type: String
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
