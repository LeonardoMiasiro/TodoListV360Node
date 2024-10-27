import {ListRepository} from "../../repositories/Interface/list-repository";
import {UpdateFailed} from "../_errors/update-failed";

interface request {
    id: string
    name: string
    position: number
}

export class UpdateListUseCase {
    constructor(private listRepository: ListRepository) {}

    async execute(params: request): Promise<void> {
        try {
            await this.listRepository.update(params.id, params)
        }
        catch {
            throw new UpdateFailed()
        }
    }
}