import {TaskRepository} from "../../repositories/Interface/task-repository";
import {CannotChangePosition} from "../_errors/cannot-change-position";

interface request {
    id: string
    listId: string;
    listPosition: number
}

export class ChangeTaskPositionUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(params: request): Promise<void> {
        try {
            await this.taskRepository.update(params.id, params)
        }
        catch {
            throw new CannotChangePosition()
        }
    }
}