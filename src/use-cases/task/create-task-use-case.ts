import {TaskRepository} from "../../repositories/Interface/task-repository";

interface request {
    name: string;
    description: string | null;
    listId: string;
    listPosition: number
}

export class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute({name,listId,listPosition,description}: request): Promise<void> {
        await this.taskRepository.create({
            name,
            description,
            listPosition,
            list: {
                connect:{
                    id: listId
                }
            }
        })
    }
}