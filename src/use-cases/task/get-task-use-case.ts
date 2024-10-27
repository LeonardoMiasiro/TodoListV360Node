import {Task} from "@prisma/client";
import {TaskRepository} from "../../repositories/Interface/task-repository";
import {ResourceNotFoundError} from "../_errors/resourse-not-found";

interface request {
    id: string
}

interface response {
    task: Task
}

export class GetTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute({id}: request): Promise<response> {
        const task = await this.taskRepository.getById(id);

        if (!task) {
            throw new ResourceNotFoundError()
        }

        return {
            task
        }
    }
}