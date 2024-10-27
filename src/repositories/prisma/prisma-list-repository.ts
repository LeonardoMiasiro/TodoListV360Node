import {ListRepository} from "../Interface/list-repository";
import {List} from "@prisma/client";
import {prisma} from "../../lib/prisma";

export class PrismaListRepository implements ListRepository {
    async getById(id: string): Promise<List | undefined> {
        const list = await prisma.list.findUnique({
            where: {
                id: id
            }
        })
        return list
    }
}