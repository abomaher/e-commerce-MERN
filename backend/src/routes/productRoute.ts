import express from "express"
import { getAllProducts, getProduct } from "../services/productService";

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const products = await getAllProducts();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send("Something went wrong: " + err);
    }
});

router.get('/:productId', async (req, res) => {
    try{
        const { productId } = req.params;
        const product = await getProduct({productId});
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;