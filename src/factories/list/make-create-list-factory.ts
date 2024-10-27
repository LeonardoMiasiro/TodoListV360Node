import {PrismaListRepository} from "../../repositories/prisma/prisma-list-repository";
import {CreateListUseCase} from "../../use-cases/list/create-list-use-case";

export function makeCreateListFactory() {
    const listRepository = new PrismaListRepository()
    const createList = new CreateListUseCase(listRepository)

    return createList
}