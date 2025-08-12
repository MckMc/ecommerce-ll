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
router.get('/login', (req,res)=> res.render('auth/login', { title:'Iniciar sesión' }));
router.get('/register', (req,res)=> res.render('auth/register', { title:'Registrarse' }));
router.get('/auth/forgot', (req,res)=> res.render('auth/forgot', { title:'Recuperar contraseña' }));
router.get('/auth/reset', (req,res)=> {
  const { token } = req.query;
  if(!token) return res.status(400).send('Token requerido');
  res.render('auth/reset', { title:'Restablecer contraseña', token });
});
export default router;
