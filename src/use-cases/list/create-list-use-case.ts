import {ListRepository} from "../../repositories/Interface/list-repository";

interface request {
    name: string
    position: number
}

export class CreateListUseCase {
    constructor(private listRepository: ListRepository) {}

    async execute(params: request): Promise<void> {
        await this.listRepository.create(params)
    }
}