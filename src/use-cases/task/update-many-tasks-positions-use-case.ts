import {TaskRepository} from "../../repositories/Interface/task-repository";
import {UpdateFailed} from "../_errors/update-failed";

interface request {
    taskId: string
    position: number
}

export class UpdateManyTasksPositionsUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(params: request[]): Promise<void> {
        try {
            await this.taskRepository.updateManyPositions(params)
        }
        catch {
            throw new UpdateFailed()
        }
    }
}