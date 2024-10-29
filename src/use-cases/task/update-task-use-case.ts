import {TaskRepository} from "../../repositories/Interface/task-repository";
import {UpdateFailed} from "../_errors/update-failed";

interface request {
    id: string
    name?: string;
    description?: string | null;
    listId?: string;
    listPosition?: number
}

export class UpdateTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(params: request): Promise<void> {
        try {
            await this.taskRepository.update(params.id, params)
        }
        catch {
            throw new UpdateFailed()
        }
    }
}