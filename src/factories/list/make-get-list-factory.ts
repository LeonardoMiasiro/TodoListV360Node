import {PrismaListRepository} from "../../repositories/prisma/prisma-list-repository";
import {GetListUseCase} from "../../use-cases/list/get-list-use-case";

export function makeGetListFactory() {
    const listRepository = new PrismaListRepository()
    const getList = new GetListUseCase(listRepository)

    return getList
}