import {List, Prisma} from "@prisma/client";

export interface ListRepository {
    getById(id: string): Promise<List | null>
    create(list: Prisma.ListCreateInput): Promise<string>
    update(listId: string, list: Prisma.ListUpdateInput): Promise<void>
    delete(id: string): Promise<void>
    getAllList(): Promise<List[]>
}