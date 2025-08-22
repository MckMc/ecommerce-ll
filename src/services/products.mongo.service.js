import Product from '../models/product.model.js';

export async function listProductsMongo({ limit=10, page=1, sort, query }) {
  limit = Math.max(1, Number(limit) || 10);
  page  = Math.max(1, Number(page)  || 1);

  let filter = {};
  if (query) {

    if (query === 'available') filter.status = true;
    else if (query === 'unavailable') filter.status = false;
    else filter.category = query;
  }

  let sortObj = {};
  if (sort === 'asc') sortObj.price = 1;
  else if (sort === 'desc') sortObj.price = -1;

  const [total, items] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter)
      .sort(sortObj)
      .skip((page-1)*limit)
      .limit(limit)
      .lean()
  ]);

  const totalPages = Math.max(1, Math.ceil(total/limit));
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  const makeLink = (p) =>
    `/api/products?limit=${limit}&page=${p}${sort?`&sort=${sort}`:''}${query?`&query=${query}`:''}`;

  return {
    status: 'success',
    payload: items,
    totalPages,
    prevPage: hasPrevPage ? page-1 : null,
    nextPage: hasNextPage ? page+1 : null,
    page,
    hasPrevPage,
    hasNextPage,
    prevLink: hasPrevPage ? makeLink(page-1) : null,
    nextLink: hasNextPage ? makeLink(page+1) : null,
  };
}

export async function getProductById(id){ return Product.findById(id).lean(); }
export async function createProductMongo(data){ return (await Product.create(data)).toObject(); }
export async function updateProductMongo(id, patch){
  delete patch.id; delete patch._id;
  return Product.findByIdAndUpdate(id, patch, { new: true, lean: true });
}
export async function deleteProductMongo(id){ return Product.findByIdAndDelete(id); }
