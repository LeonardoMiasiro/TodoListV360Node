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

    async create(list: Prisma.ListCreateInput): Promise<string> {
        const newlist = await prisma.list.create({
            data: list
        })
        return newlist.id
    }

    async update(listId: string, list: Prisma.ListUpdateInput): Promise<void> {
        await prisma.list.update({
            where: {
                id: listId
            },
            data: list
        })
    }

    async delete(id: string): Promise<void> {
        await prisma.list.delete({
            where: {
                id: id
            }
        })
    }

    async getAllList(): Promise<List[]> {
        const list = await prisma.list.findMany({
            include: {
                tasks: true
            }
        })

        return list
    }
}