import { Router } from 'express';
import {
    postCart, getCartProducts, postCartProduct,
    deleteCartProduct, putCart, putCartProductQty, deleteAllCartProducts
} from '../controllers/carts.controller.js';

const router = Router();
router.post('/', postCart);
router.get('/:cid', getCartProducts);
router.post('/:cid/product/:pid', postCartProduct);

router.delete('/:cid/products/:pid', deleteCartProduct);
router.put('/:cid', putCart);
router.put('/:cid/products/:pid', putCartProductQty);
router.delete('/:cid', deleteAllCartProducts);

export default router;
