import { Router } from "express";
import { isAuthentication } from "./middlewares/IsAuthentication";
import { RegisterUserController } from "./controllers/register/RegisterUserController";
import { AuthUserController } from "./controllers/login/AuthUserController";
import { ListUserController } from "./controllers/login/ListUserController";

const router = Router()

router.get("/", (request, response) => {
    return response.send("Página inicial")
})

router.post("/register", new RegisterUserController().handle )
router.post("/session", new AuthUserController().handle)
router.get("/list", isAuthentication, new ListUserController().handle )

export { router }