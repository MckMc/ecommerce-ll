import { Router } from 'express';
import { getAll, getOne, postOne, putOne, deleteOne } from '../controllers/products.controller.js';

const router = Router();
// GET
router.get('/', getAll);
// GET producto por id
router.get('/:pid', getOne);
// POST
router.post('/', postOne);
// PUT
router.put('/:pid', putOne);
// DELETE elimina por id
router.delete('/:pid', deleteOne);

export default router;
