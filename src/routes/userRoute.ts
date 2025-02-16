import express from "express"
import { login, register } from "../services/userServices";

const router = express.Router();

router.post('/register', async (request, resopnse) => {
    const { fristName, lastName, email, password } = request.body;
    const { data, statusCode } = await register({fristName, lastName, email, password});
    resopnse.status(statusCode).send(data);
});

router.post('/login', async (request, resopnse) => {
    const { email, password } = request.body;
    const { data, statusCode } = await login({ email, password });
    resopnse.status(statusCode).send(data);
});

router.get('/', async (request, resopnse) => {
    resopnse.send("Hiiiiiii");
})

export default router;