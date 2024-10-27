import {PrismaListRepository} from "../../repositories/prisma/prisma-list-repository";
import {DeleteListUseCase} from "../../use-cases/list/delete-list-use-case";

export function makeDeleteListFactory() {
    const listRepository = new PrismaListRepository()
    const deleteList = new DeleteListUseCase(listRepository)

    return deleteList
}