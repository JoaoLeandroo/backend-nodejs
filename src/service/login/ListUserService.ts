import { prisma } from "../../prisma/prisma";

class ListUserService {
    async execute() {
        const list = await prisma.usuario.findMany({
            select: {
                id: true,
                name: true,
                createAt: true,
            }
        })

        return list
    }
}

export { ListUserService }