import { ProductsRepository as repo } from '../repositories/products.repository.js';

export async function getAll(req, res) {
  try {
    const data = await repo.list(req.query);
    res.json(data);
  } catch (e) {
    res.status(500).json({ status: 'error', error: e.message });
  }
}

export async function getOne(req, res) {
  const p = await repo.get(req.params.pid);
  if (!p) return res.status(404).json({ status: 'error', error: 'Product not found' });
  res.json(p);
}

export async function postOne(req, res) {
  try {
    const created = await repo.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ status: 'error', error: e.message });
  }
}

export async function putOne(req, res) {
  const updated = await repo.update(req.params.pid, req.body);
  if (!updated) return res.status(404).json({ status: 'error', error: 'Product not found' });
  res.json(updated);
}

export async function deleteOne(req, res) {
  const ok = await repo.remove(req.params.pid);
  if (!ok) return res.status(404).json({ status: 'error', error: 'Product not found' });
  res.status(204).send();
}
