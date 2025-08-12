import ProductsDAO from '../dao/products.dao.js';
const dao = new ProductsDAO();

export const ProductsRepository = {
  list: (opts) => dao.list(opts?.filter || {}, null, opts?.query || {}),
  get:  (id)   => dao.getById(id),
  create: (data) => dao.create(data),
  update: (id, patch) => dao.update(id, patch),
  remove: (id) => dao.delete(id)
};
