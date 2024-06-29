import { Router } from "express";
import { RegisterUserController } from "./controllers/register/RegisterUserController";
import { AuthUserController } from "./controllers/login/AuthUserController";

const router = Router()

router.get("/", (request, response) => {
    return response.send("Página inicial")
})

router.post("/register", new RegisterUserController().handle )
router.post("/session", new AuthUserController().handle)

export { router }