import { CartModel } from '../models/cart.schema.js';

export default class CartsDAO {
  create() { return CartModel.create({ products: [] }); }
  getById(id) { return CartModel.findById(id).lean(); }
  getByIdPopulated(id) {
    return CartModel.findById(id).populate('products.product').lean();
  }
  replaceProducts(id, products) {
    return CartModel.findByIdAndUpdate(id, { products }, { new:true, lean:true });
  }
}
