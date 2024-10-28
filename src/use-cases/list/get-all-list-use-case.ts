import {List} from "@prisma/client";
import {ListRepository} from "../../repositories/Interface/list-repository";
import {ResourceNotFoundError} from "../_errors/resourse-not-found";


interface response {
    list: List[]
}

export class GetAllListUseCase {
    constructor(private listRepository: ListRepository) {}

    async execute(): Promise<response> {
        const list = await this.listRepository.getAllList()

        if (!list) {
            throw new ResourceNotFoundError()
        }

        return {
            list
        }
    }

}