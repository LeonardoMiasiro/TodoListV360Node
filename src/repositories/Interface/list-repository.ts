import {List, Prisma} from "@prisma/client";

export interface ListRepository {
    getById(id: string): Promise<List | null>;
    create(list: Prisma.ListCreateInput): Promise<void>
}