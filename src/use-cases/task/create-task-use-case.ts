import {TaskRepository} from "../../repositories/Interface/task-repository";

interface request {
    name: string;
    description: string | null;
    listId: string;
    listPosition: number
}

interface response {
    id: string
}

export class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute({name,listId,listPosition,description}: request): Promise<response> {
        const taskId = await this.taskRepository.create({
            name,
            description,
            listPosition,
            list: {
                connect:{
                    id: listId
                }
            }
        })

        return {
            id: taskId
        }
    }
}