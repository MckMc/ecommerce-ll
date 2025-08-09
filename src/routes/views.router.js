import { Router } from 'express';
import { listProductsMongo } from '../services/products.mongo.service.js';
import { getCart } from '../services/carts.mongo.service.js';

const router = Router();

router.get('/', async (req,res)=>{ res.redirect('/products'); });

router.get('/products', async (req,res)=>{
  const data = await listProductsMongo(req.query);
  res.render('home', { ...data, title:'Productos' });
});

router.get('/carts/:cid', async (req, res) => {
  const cart = await getCart(req.params.cid);
  if (!cart) return res.status(404).send('Cart not found');
  res.render('cart', {
    title: 'Carrito',
    cart,
    cartJson: JSON.stringify(cart.products)
  });
});
export default router;
