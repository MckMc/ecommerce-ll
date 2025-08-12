import crypto from 'crypto';
import ProductsDAO from '../dao/products.dao.js';
import CartsDAO from '../dao/carts.dao.js';
import TicketsDAO from '../dao/tickets.dao.js';

const pdao = new ProductsDAO();
const cdao = new CartsDAO();
const tdao = new TicketsDAO();

export async function purchaseCart(cartId, purchaserEmail) {
  const cart = await cdao.getByIdPopulated(cartId);
  if (!cart) throw new Error('Cart not found');

  const purchasable = [];
  const failed = [];

  for (const item of cart.products) {
    const prod = item.product;
    if (prod?.stock >= item.quantity && prod.status !== false) {
      purchasable.push(item);
    } else {
      failed.push(String(prod?._id));
    }
  }

  // Descontar stock
  for (const it of purchasable) {
    await pdao.decStock(it.product._id, it.quantity);
  }

  const amount = purchasable.reduce((sum, it) => sum + it.product.price * it.quantity, 0);

  let ticket = null;
  if (purchasable.length > 0) {
    ticket = await tdao.create({
      code: `T-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
      amount,
      purchaser: purchaserEmail
    });
  }

  const failedItems = cart.products
    .filter(it => failed.includes(String(it.product._id)))
    .map(it => ({ product: it.product._id, quantity: it.quantity }));

  await cdao.replaceProducts(cartId, failedItems);

  return { ticket, unprocessedProducts: failed };
}
