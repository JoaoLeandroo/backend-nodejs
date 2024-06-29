import { prisma } from "../../prisma/prisma";
import { z } from "zod";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"

interface AuthUserProps {
    name: string;
    password: string;
}

const AuthUser = z.object({
    name: z.string().min(3, {message: "Informe um nome válido."}),
    password: z.string().min(3, {message: "A senha deve conter no minímo 3 caracteres"}).max(22)
})

class AuthUserService {
    async execute({ name, password }: AuthUserProps) {

        const parseResult = AuthUser.safeParse({name, password})
        if(!parseResult.success) {
            return {
                Error: parseResult.error.flatten().fieldErrors
            }
        }

        const nameLowerCase = name.toLowerCase()

        const AlreadyExistUser = await prisma.usuario.findFirst({
            where: {name: nameLowerCase},
        })

        if(!AlreadyExistUser) {
            return {
                Error: {message: "Usuario ou senha inválidos."}
            }
        }

        const passwordCompare = await compare(password, AlreadyExistUser.password)

        if(!passwordCompare) {
            return {
                Error: {message: "Usuario ou senha inválidos!!!!"}
            }
        }

        return {
            id: AlreadyExistUser.id,
            name: AlreadyExistUser.name,
            lastVisit: AlreadyExistUser.updateAt,
        }

    }
}

export { AuthUserService }