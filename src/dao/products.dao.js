import { ProductModel } from '../models/product.schema.js';

export default class ProductsDAO {
  list(filter={}, proj=null, opts={}) { return ProductModel.find(filter, proj, opts).lean(); }
  getById(id) { return ProductModel.findById(id).lean(); }
  create(data) { return ProductModel.create(data); }
  update(id, patch) { return ProductModel.findByIdAndUpdate(id, patch, { new:true, lean:true }); }
  delete(id) { return ProductModel.findByIdAndDelete(id); }
  decStock(id, qty) { return ProductModel.findByIdAndUpdate(id, { $inc: { stock: -qty } }, { new:true, lean:true }); }
}
