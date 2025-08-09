import { ProductModel } from '../models/product.schema.js';

const SAMPLE_PRODUCTS = [
  {
    title: "Tabla Soft Shockn Blue 5'5\"",
    description: "Tabla softboard para principiantes.",
    code: "TS-001",
    price: 1200,
    stock: 10,
    category: "tablas",
    status: true,
    thumbnails: ["ts_1.jpg"]
  },
  {
    title: "Remera Thermoshield manga corta",
    description: "Producto templado, ideal aguas frías.",
    code: "RE-001",
    price: 118953,
    stock: 8,
    category: "ropa",
    status: true,
    thumbnails: ["re_1.jpg"]
  },
  {
    title: "Quilla FCS II Performer",
    description: "Juego de quillas medianas all-round.",
    code: "AC-101",
    price: 85,
    stock: 25,
    category: "accesorios",
    status: true,
    thumbnails: []
  },
  {
    title: "Leash 6' Premium",
    description: "Leash 6 pies, cordón 7mm.",
    code: "AC-102",
    price: 30,
    stock: 40,
    category: "accesorios",
    status: true,
    thumbnails: []
  },
  {
    title: "Parafina Tropical",
    description: "Mayor agarre en aguas cálidas.",
    code: "AC-103",
    price: 6,
    stock: 100,
    category: "accesorios",
    status: true,
    thumbnails: []
  }
];

export async function seedProductsIfEmpty() {
  const count = await ProductModel.estimatedDocumentCount();
  if (count > 0) return { seeded: false, count };

  await ProductModel.insertMany(SAMPLE_PRODUCTS);
  return { seeded: true, count: SAMPLE_PRODUCTS.length };
}
