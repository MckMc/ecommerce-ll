import { CartModel } from '../models/cart.schema.js';
import { ProductModel } from '../models/product.schema.js';

export async function createCart(){ return (await CartModel.create({ products: [] })).toObject(); }
export async function getCart(cid) {
    return CartModel.findById(cid)
    .populate('products.product')
    .lean();
}

//  Eliminar un producto del carrito
export async function removeProductFromCart(cid, pid){
  const cart = await CartModel.findById(cid);
  if(!cart) return null;
  cart.products = cart.products.filter(p => String(p.product) !== String(pid));
  await cart.save();
  return cart;
}

// rReemplazar
export async function replaceCartProducts(cid, items){
    const ids = items.map(i=>i.product);
    const existing = await ProductModel.find({ _id: { $in: ids }}).select('_id').lean();
    const valid = new Set(existing.map(e=>String(e._id)));
    const sanitized = items
    .filter(i=> valid.has(String(i.product)))
    .map(i=>({ product: i.product, quantity: Math.max(1, Number(i.quantity)||1) }));
    const cart = await CartModel.findByIdAndUpdate(cid, { products: sanitized }, { new: true });
    return cart;
}

// Actualizar SOLO la cantidad
export async function updateProductQty(cid, pid, qty){
    const cart = await CartModel.findById(cid);
    if(!cart) return null;
    const item = cart.products.find(p => String(p.product) === String(pid));
    if(!item) return null;
    item.quantity = Math.max(1, Number(qty)||1);
    await cart.save();
    return cart;
}

// Vaciar carrito
export async function emptyCart(cid){
    return CartModel.findByIdAndUpdate(cid, { products: [] }, { new: true });
}

// Agregar +1
export async function addProductToCartMongo(cid, pid){
    const cart = await CartModel.findById(cid);
    if(!cart) throw new Error('Cart not found');
    const idx = cart.products.findIndex(p => String(p.product) === String(pid));
    if(idx === -1) cart.products.push({ product: pid, quantity: 1 });
    else cart.products[idx].quantity += 1;
    await cart.save();
    return cart;
}
