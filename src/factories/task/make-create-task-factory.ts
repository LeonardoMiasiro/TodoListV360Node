import {PrismaTaskRepository} from "../../repositories/prisma/prisma-task-repository";
import {CreateTaskUseCase} from "../../use-cases/task/create-task-use-case";

export function makeCreateTaskFactory() {
    const taskRepository = new PrismaTaskRepository()
    const createTask = new CreateTaskUseCase(taskRepository)

    return createTask
}