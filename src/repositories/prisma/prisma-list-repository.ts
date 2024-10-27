import {ListRepository} from "../Interface/list-repository";
import {List, Prisma} from "@prisma/client";
import {prisma} from "../../lib/prisma";

export class PrismaListRepository implements ListRepository {
    async getById(id: string): Promise<List | null> {
        const list = await prisma.list.findUnique({
            where: {
                id: id
            }
        })
        return list
    }

    async create(list: Prisma.ListCreateInput): Promise<void> {
        await prisma.list.create({
            data: list
        })
    }

    async update(listId: string, list: Prisma.ListUpdateInput): Promise<void> {
        await prisma.list.update({
            where: {
                id: listId
            },
            data: list
        })
    }
}