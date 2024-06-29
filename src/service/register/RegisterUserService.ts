import { z } from "zod"
import { prisma } from "../../prisma/prisma"

interface RegisterUserProps {
    name: string;
    password: string;
}

const User = z.object({
    name: z.string().min(3, {message: "Informe um nome válido."}),
    password: z.string().min(6, {message: "A senha precisa ter no minímo 6 caracteres."}),
})

class RegisterUserService {
    async execute({ name, password }: RegisterUserProps) {

        const parseResult = User.safeParse({name, password})
        if(!parseResult.success) {
            return {
                Error: parseResult.error.flatten().fieldErrors
            }
        }
        const nameLowerCase = name.toLowerCase()

        const userAlreadyExists = await prisma.usuario.findFirst({
            where: {name: nameLowerCase}
        })

        if(userAlreadyExists) {
            return { message: "Usuario já registrado!" }
        }


        const user = await prisma.usuario.create({
            data: {
                name: nameLowerCase,
                password: password,
            }
        })

        return user;
        
    }
}

export { RegisterUserService }
