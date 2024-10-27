import {PrismaTaskRepository} from "../../repositories/prisma/prisma-task-repository";
import {DeleteTaskUseCase} from "../../use-cases/task/delete-task-use-case";

export function makeDeleteTaskFactory() {
    const taskRepository = new PrismaTaskRepository()
    const deleteTask = new DeleteTaskUseCase(taskRepository)

    return deleteTask
}