import {TaskRepository} from "../../repositories/Interface/task-repository";

interface request {
    name: string;
    description: string | null;
    listId: string;
    listPosition: number
}

export class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(params: request): Promise<void> {
        await this.taskRepository.create({
            ...params,
            list: {
                connect:{
                    id: params.listId
                }
            }
        })
    }
}