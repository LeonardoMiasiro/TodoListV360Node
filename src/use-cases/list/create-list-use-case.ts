import {ListRepository} from "../../repositories/Interface/list-repository";

interface request {
    name: string
    position: number
}

interface response {
    id: string
}

export class CreateListUseCase {
    constructor(private listRepository: ListRepository) {}

    async execute(params: request): Promise<response> {
        const listId = await this.listRepository.create(params)

        return {
            id: listId
        }
    }
}