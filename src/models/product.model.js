import mongoose from "mongoose";
import ProductSchema from "./product.schema.js";

export default mongoose.models.Product
  ? mongoose.models.Product
  : mongoose.model("Product", ProductSchema);
