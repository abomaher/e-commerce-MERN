import express from "express"
import { getAllProducts } from "../services/productService";

const router = express.Router();

router.get('/', async (request, resopnse) => {
    const products = await getAllProducts();
    resopnse.status(200).send(products);
});

export default router;