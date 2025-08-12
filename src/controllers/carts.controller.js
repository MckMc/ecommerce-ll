import {
    createCart, getCart, addProductToCartMongo, removeProductFromCart,
    replaceCartProducts, updateProductQty, emptyCart
} from '../services/carts.mongo.service.js';
import { purchaseCart } from '../repositories/carts.repository.js';

export async function postCart(req,res){ const c = await createCart(); res.status(201).json(c); }
export async function getCartProducts(req,res){
    const c = await getCart(req.params.cid);
    if(!c) return res.status(404).json({ error:'Cart not found' });
    res.json(c.products);
}
export async function postCartProduct(req,res){
    try { const c = await addProductToCartMongo(req.params.cid, req.params.pid); res.status(201).json(c); }
    catch(e){ res.status(404).json({ error:e.message }); }
}

export async function deleteCartProduct(req,res){
    const c = await removeProductFromCart(req.params.cid, req.params.pid);
    if(!c) return res.status(404).json({ error:'Cart not found' });
    res.json(c);
}
export async function putCart(req,res){
    const c = await replaceCartProducts(req.params.cid, req.body.products || []);
    if(!c) return res.status(404).json({ error:'Cart not found' });
    res.json(c);
}
export async function putCartProductQty(req,res){
    const c = await updateProductQty(req.params.cid, req.params.pid, req.body.quantity);
    if(!c) return res.status(404).json({ error:'Cart or product not found' });
    res.json(c);
}
export async function deleteAllCartProducts(req,res){
    const c = await emptyCart(req.params.cid);
    if(!c) return res.status(404).json({ error:'Cart not found' });
    res.json(c);
}
export async function purchase(req, res) {
  try {
    const { cid } = req.params;
    const purchaserEmail = req.user.email; // viene de passport "current"
    const result = await purchaseCart(cid, purchaserEmail);
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}