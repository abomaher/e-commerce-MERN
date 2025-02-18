import expess from "express";
import { addItemToCart, getActiveCartForUser, updateItemToCart } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const router = expess.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send("Something went wrong: " + err);
  }
});

router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something went wrong: " + err);
  }
});

router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await updateItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something went wrong: " + err);
  }
});

export default router;
