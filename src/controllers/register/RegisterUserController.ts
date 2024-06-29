import { Request, Response } from "express";
import { RegisterUserService } from "../../service/register/RegisterUserService";

class RegisterUserController {
    async handle(request: Request, response: Response) {
        const { name, password } = request.body
        const registerUserService = new RegisterUserService()

        const user = await registerUserService.execute({
            name,
            password,
        })

        return response.json(user)

    }
}

export { RegisterUserController }