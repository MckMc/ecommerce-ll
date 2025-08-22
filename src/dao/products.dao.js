import Product from '../models/product.model.js';

export default class ProductsDAO {
  list(filter={}, proj=null, opts={}) { return Product.find(filter, proj, opts).lean(); }
  getById(id) { return Product.findById(id).lean(); }
  create(data) { return Product.create(data); }
  update(id, patch) { return Product.findByIdAndUpdate(id, patch, { new:true, lean:true }); }
  delete(id) { return Product.findByIdAndDelete(id); }
  decStock(id, qty) { return Product.findByIdAndUpdate(id, { $inc: { stock: -qty } }, { new:true, lean:true }); }
}
