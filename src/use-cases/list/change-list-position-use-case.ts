import {ListRepository} from "../../repositories/Interface/list-repository";
import {CannotChangePosition} from "../_errors/cannot-change-position";

interface request {
    id: string
    position: number
}

export class ChangeListPositionUseCase {
    constructor(private listRepository: ListRepository) {}

    async execute(params: request): Promise<void> {
        try {
            await this.listRepository.update(params.id, params)
        }
        catch {
            throw new CannotChangePosition()
        }
    }
}