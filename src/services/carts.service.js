import crypto from 'crypto';
import JsonRepo from '../repositories/json.repo.js';
import { makeCart } from '../models/cart.model.js';
import { getProduct } from './products.service.js';

const carts = new JsonRepo('carts.json');

export async function createCart() {
    const cart = makeCart({ id: crypto.randomUUID(), products: [] });
    return carts.insert(cart);
}

export async function getCart(cid) {
    return carts.getById(cid);
}

export async function listCartProducts(cid) {
    const cart = await getCart(cid);
    return cart ? cart.products : null;
}

export async function addProductToCart(cid, pid) {
    const product = await getProduct(pid);
    if (!product) throw new Error('Product not found');

    const cart = await getCart(cid);
    if (!cart) throw new Error('Cart not found');

    const idx = cart.products.findIndex(p => String(p.product) === String(pid));
    if (idx === -1) {
    cart.products.push({ product: String(pid), quantity: 1 });
    } else {
        cart.products[idx].quantity += 1;
    }
    await carts.updateById(cid, { products: cart.products });
    return cart;
}
