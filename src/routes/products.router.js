import { Router } from 'express';
import { getAll, getOne, postOne, putOne, deleteOne } from '../controllers/products.controller.js';
import { requireAuth, requireRole } from '../middlewares/authz.js';

const router = Router();
// GET
router.get('/', getAll);
// GET producto por id
router.get('/:pid', getOne);
// POST
router.post('/', requireAuth, requireRole('admin'), postOne);
// PUT
router.put('/:pid', requireAuth, requireRole('admin'), putOne);
// DELETE elimina por id
router.delete('/:pid', requireAuth, requireRole('admin'), deleteOne);

export default router;
