import {PrismaListRepository} from "../../repositories/prisma/prisma-list-repository";
import {UpdateListUseCase} from "../../use-cases/list/update-list-use-case";

export function makeUpdateListFactory() {
    const listRepository = new PrismaListRepository()
    const updateList = new UpdateListUseCase(listRepository)

    return updateList
}