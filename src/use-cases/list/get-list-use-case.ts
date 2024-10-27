import {List} from "@prisma/client";
import {ListRepository} from "../../repositories/Interface/list-repository";
import {ResourceNotFoundError} from "../_errors/resourse-not-found";

interface request {
    id: string
}

interface response {
    list: List
}

export class GetListUseCase {
    constructor(private listRepository: ListRepository) {}

    async execute({id}: request): Promise<response> {
        const list = await this.listRepository.getById(id)

        if (!list) {
            throw new ResourceNotFoundError()
        }

        return {
            list
        }
    }

}