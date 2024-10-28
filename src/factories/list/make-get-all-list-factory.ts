import {PrismaListRepository} from "../../repositories/prisma/prisma-list-repository";
import {GetAllListUseCase} from "../../use-cases/list/get-all-list-use-case";

export function makeGetAllListFactory() {
    const listRepository = new PrismaListRepository()
    const getAllList = new GetAllListUseCase(listRepository)

    return getAllList
}