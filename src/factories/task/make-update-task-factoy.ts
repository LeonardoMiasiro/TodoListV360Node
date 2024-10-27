import {PrismaTaskRepository} from "../../repositories/prisma/prisma-task-repository";
import {UpdateTaskUseCase} from "../../use-cases/task/update-task-use-case";

export function makeUpdateTaskFactory() {
    const taskRepository = new PrismaTaskRepository()
    const updateTask = new UpdateTaskUseCase(taskRepository)

    return updateTask
}