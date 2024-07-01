import { Request, Response } from "express";
import { CheckUserService } from "../../service/register/CheckUserService";

class CheckUserController {
    async handle(request: Request, response: Response) {
        const { name } = request.body;
        const checkUserService = new CheckUserService();

        const result = await checkUserService.execute({ name: String(name) });

        return response.json(result);
    }
}

export { CheckUserController }