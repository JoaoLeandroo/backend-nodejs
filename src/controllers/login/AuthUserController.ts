import { Request, Response } from "express";
import { AuthUserService } from "../../service/login/AuthUserService";

class AuthUserController {
    async handle(request: Request, response: Response) {
        const { name, password } = request.body

        const authUserService = new AuthUserService()
        const auth = await authUserService.execute({
            name,
            password,
        })

        return response.json(auth)
    }
}

export { AuthUserController }