import { Router } from "express";
import { RegisterUserController } from "./controllers/register/RegisterUserController";

const router = Router()

router.get("/", (request, response) => {
    return response.send("Página inicial")
})

router.post("/register", new RegisterUserController().handle )

export { router }