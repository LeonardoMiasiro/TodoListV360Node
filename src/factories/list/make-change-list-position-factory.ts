import {PrismaListRepository} from "../../repositories/prisma/prisma-list-repository";
import {ChangeListPositionUseCase} from "../../use-cases/list/change-list-position-use-case";

export function makeChangeListPositionListFactory() {
    const listRepository = new PrismaListRepository()
    const changeListPosition = new ChangeListPositionUseCase(listRepository)

    return changeListPosition
}