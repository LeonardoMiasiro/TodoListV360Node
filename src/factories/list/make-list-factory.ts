import {PrismaListRepository} from "../../repositories/prisma/prisma-list-repository";
import {GetListUseCase} from "../../use-cases/list/get-list-use-case";

export function makeListFactory() {
    const listRepository = new PrismaListRepository()
    const getList = new GetListUseCase(listRepository)

    return getList
}