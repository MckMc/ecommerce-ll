import { Router } from "express";
import Product from "../models/product.model.js";

const router = Router();

// LISTA /products
router.get("/", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;

  const r = await Product.paginate({}, { page, limit, lean: true });
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } = r;

  res.render("products", {
    products: docs,
    page: r.page,
    totalPages,
    hasPrevPage,
    hasNextPage,
    prevLink: hasPrevPage ? `/products?page=${prevPage}` : null,
    nextLink: hasNextPage ? `/products?page=${nextPage}` : null,
  });
});

// DETALLE /products/:id
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return res.status(404).render("404");
  res.render("product-detail", { product });
});

export default router;
