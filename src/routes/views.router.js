import { Router } from 'express';
import { listProductsMongo, getProductById } from '../services/products.mongo.service.js';
import { getCart } from '../services/carts.mongo.service.js';

const router = Router();

router.get('/products', async (req, res, next) => {
  try {
    const page  = Number(req.query.page)  || 1;
    const limit = Number(req.query.limit) || 10;

    const data = await listProductsMongo({ page, limit });

    const products   = data.payload || data.docs || [];
    const totalPages = data.totalPages ?? 1;
    const hasPrevPage = !!data.hasPrevPage;
    const hasNextPage = !!data.hasNextPage;
    const prevLink = data.prevLink ?? (hasPrevPage ? `/products?page=${(data.prevPage ?? page-1)}` : null);
    const nextLink = data.nextLink ?? (hasNextPage ? `/products?page=${(data.nextPage ?? page+1)}` : null);

    res.render('products', {
      title: 'Productos',
      products,
      page: data.page ?? page,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (err) { next(err); }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).render('404', { title: 'Producto no encontrado' });
    res.render('product-detail', { title: product.title, product });
  } catch (err) { next(err); }
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

router.get('/login',    (req,res)=> res.render('auth/login',    { title:'Iniciar sesión' }));
router.get('/register', (req,res)=> res.render('auth/register', { title:'Registrarse' }));
router.get('/auth/forgot', (req,res)=> res.render('auth/forgot',{ title:'Recuperar contraseña' }));
router.get('/auth/reset',  (req,res)=> {
  const { token } = req.query;
  if(!token) return res.status(400).send('Token requerido');
  res.render('auth/reset', { title:'Restablecer contraseña', token });
});

export default router;
