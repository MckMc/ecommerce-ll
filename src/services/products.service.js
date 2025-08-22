import Product from "../models/product.model.js";

const PROJECTION = "-__v";

export async function listProducts({ page = 1, limit = 10 } = {}) {
  page = Number(page); limit = Number(limit);
  const skip = (page - 1) * limit;

  const [docs, total] = await Promise.all([
    Product.find({}, PROJECTION).skip(skip).limit(limit).lean(),
    Product.countDocuments(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    docs,
    page,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  };
}

export function getProduct(pid) {
  return Product.findById(pid, PROJECTION).lean();
}

export async function createProduct(data) {
  const payload = {
    title: data.title?.trim(),
    price: Number(data.price),
    stock: Number(data.stock ?? 0),
    image: data.image || null,
    thumbnails: Array.isArray(data.thumbnails) ? data.thumbnails : [],
  };
  const doc = await Product.create(payload);
  return doc.toObject ? doc.toObject() : doc;
}

export function updateProduct(pid, patch) {
  delete patch.id; delete patch._id;
  if ("price" in patch) patch.price = Number(patch.price);
  if ("stock" in patch) patch.stock = Number(patch.stock);
  return Product.findByIdAndUpdate(pid, patch, { new: true, projection: PROJECTION, lean: true });
}

export function deleteProduct(pid) {
  return Product.findByIdAndDelete(pid);
}
