import crypto from 'crypto';
import JsonRepo from '../repositories/json.repo.js';
import { makeProduct } from '../models/product.model.js';

const repo = new JsonRepo('products.json');

export async function listProducts(limit) {
    const all = await repo.getAll();
    return limit ? all.slice(0, Number(limit)) : all;
}

export async function getProduct(pid) {
    return repo.getById(pid);
}

export async function createProduct(data) {
    const product = makeProduct({
        ...data,
        status: data.status ?? true,
        id: crypto.randomUUID()
    });
    return repo.insert(product);
}

export async function updateProduct(pid, patch) {
    if ('id' in patch) delete patch.id;
        return repo.updateById(pid, patch);
    }

export async function deleteProduct(pid) {
    return repo.deleteById(pid);
}
