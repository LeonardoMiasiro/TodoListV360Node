import {List} from "@prisma/client";

export interface ListRepository {
    getById(id: string): Promise<List | undefined>;
}