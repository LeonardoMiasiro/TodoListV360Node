import {ListRepository} from "../../repositories/Interface/list-repository";
import {DeleteFailed} from "../_errors/delete-failed";

interface request {
    id: string
}

export class DeleteListUseCase {
    constructor(private listRepository: ListRepository) {}

    async execute(params: request): Promise<void> {
        try {
            await this.listRepository.delete(params.id)
        }
        catch {
            throw new DeleteFailed()
        }
    }
}