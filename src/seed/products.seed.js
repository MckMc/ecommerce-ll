import Product from '../models/product.model.js';

const SAMPLE_PRODUCTS = [
  {
    title: "Tabla Soft Shockn Blue 5'5\"",
    description: "Tabla softboard para principiantes.",
    code: "TS-001",
    price: 1200,
    stock: 11,
    category: "tablas",
    status: true,
    image: "/img/products/tabla.jpg",
    thumbnails: []
  },
  {
    title: "Remera Thermoshield manga corta",
    description: "Producto templado, ideal aguas frías.",
    code: "RE-001",
    price: 118953,
    stock: 8,
    category: "ropa",
    status: true,
    image: "/img/products/remera.jpg",
    thumbnails: []
  },
  {
    title: "Quilla FCS II Performer",
    description: "Juego de quillas medianas all-round.",
    code: "AC-101",
    price: 85,
    stock: 25,
    category: "accesorios",
    status: true,
    image: "/img/products/quilla.jpg",
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
    image: "/img/products/leash.jpg",
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
    image: "/img/products/parafina.jpg",
    thumbnails: []
  }
];

export async function seedProductsIfEmpty() {
  const count = await Product.estimatedDocumentCount();
  if (count > 0) return { seeded: false, count };

  await Product.insertMany(SAMPLE_PRODUCTS);
  return { seeded: true, count: SAMPLE_PRODUCTS.length };
}
