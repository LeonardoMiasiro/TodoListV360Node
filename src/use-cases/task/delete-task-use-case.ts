import {TaskRepository} from "../../repositories/Interface/task-repository";
import {DeleteFailed} from "../_errors/delete-failed";

interface request {
    id: string
}

export class DeleteTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(params: request): Promise<void> {
        try {
            await this.taskRepository.delete(params.id)
        }
        catch {
            throw new DeleteFailed()
        }
    }
}