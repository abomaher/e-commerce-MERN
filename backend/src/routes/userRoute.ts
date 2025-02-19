import express from "express";
import { login, register } from "../services/userServices";

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

export default router;
