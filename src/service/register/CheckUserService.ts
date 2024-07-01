import { prisma } from "../../prisma/prisma";

interface CheckUserProps {
    name: string;
}

class CheckUserService {
    async execute({name}: CheckUserProps) {

        const nameLowerCase = name.toLowerCase();
         
        const user = await prisma.usuario.findFirst({
            where: { name: nameLowerCase }
        });

        if (user) {
            return { message: "Usuario já registrado!" };
        } else {
            return { message: "Nome de usuario disponivel." };
        }
    }
}

export { CheckUserService }