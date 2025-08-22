import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    image: { type: String },
    thumbnails: [{ type: String ,default:null}],
  },
  { versionKey: false, timestamps: true }
);

export default ProductSchema;
