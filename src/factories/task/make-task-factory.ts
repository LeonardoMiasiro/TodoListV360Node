import {PrismaTaskRepository} from "../../repositories/prisma/prisma-task-repository";
import {GetTaskUseCase} from "../../use-cases/task/get-task-use-case";

export function makeTaskFactory() {
    const taskRepository = new PrismaTaskRepository()
    const getTask = new GetTaskUseCase(taskRepository)

    return getTask
}