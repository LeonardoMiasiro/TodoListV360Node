import {PrismaTaskRepository} from "../../repositories/prisma/prisma-task-repository";
import {ChangeTaskPositionUseCase} from "../../use-cases/task/change-task-position-use-case";

export function makeChangeTaskPositionTaskFactory() {
    const taskRepository = new PrismaTaskRepository()
    const changeTaskPositionTask = new ChangeTaskPositionUseCase(taskRepository)

    return changeTaskPositionTask
}