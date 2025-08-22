// scripts/fix-images.js
import mongoose from 'mongoose';
import 'dotenv/config.js';
import Product from '../src/models/product.model.js'; // ojo la ruta a src/

// Como elegiste Opción A (URL completa en `image`)
const MAP = {
  'TS-001': '/img/products/tabla.jpg',
  'RE-001': '/img/products/remera.jpg',
  'AC-101': '/img/products/quilla.jpg',
  'AC-102': '/img/products/leash.jpg',
  'AC-103': '/img/products/parafina.jpg',
};

const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/ecommerce';

async function run() {
  await mongoose.connect(uri);
  for (const [code, image] of Object.entries(MAP)) {
    const r = await Product.updateOne({ code }, { $set: { image } });
    console.log(`${code} → ${image} | matched:${r.matchedCount} modified:${r.modifiedCount}`);
  }
  await mongoose.disconnect();
  console.log('Listo.');
}

run().catch(err => { console.error(err); process.exit(1); });
