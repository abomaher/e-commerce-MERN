import express from "express";
import { getMyOrder, login, register } from "../services/userServices";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.post("/register", async (request, resopnse) => {
  try {
    const { fristName, lastName, email, password } = request.body;
    const { data, statusCode } = await register({
      fristName,
      lastName,
      email,
      password,
    });
    resopnse.status(statusCode).json(data);
  } catch (err) {
    resopnse.status(500).send("Something went wrong: " + err);
  }
});

router.post("/login", async (request, resopnse) => {
  try {
    const { email, password } = request.body;
    const { data, statusCode } = await login({ email, password });
    resopnse.status(statusCode).json(data);
  } catch (err) {
    resopnse.status(500).send("Something went wrong: " + err);
  }
});

router.get("/", async (request, resopnse) => {
  try {
    resopnse.send("Hiiiiiii");
  } catch (err) {
    resopnse.status(500).send("Something went wrong: " + err);
  }
});

router.get("/myOrder", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { statusCode, data } = await getMyOrder({ userId });
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("Something went wrong: " + err);
  }
});

export default router;
