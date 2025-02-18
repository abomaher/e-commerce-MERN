import expess from "express";
import { getActiveCartForUser } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const router = expess.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const cart = await getActiveCartForUser({ userId });
      res.status(200).send(cart);
    } catch (err) {
      res.status(500).send("Something went wrong!" + err);
    }
  });

export default router;
