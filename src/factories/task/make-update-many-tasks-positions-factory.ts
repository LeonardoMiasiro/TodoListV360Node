import { UpdateManyTasksPositionsUseCase } from "src/use-cases/task/update-many-tasks-positions-use-case";
import {PrismaTaskRepository} from "../../repositories/prisma/prisma-task-repository";

export function makeUpdateManyTasksPositionsFactory() {
    const taskRepository = new PrismaTaskRepository()
    const updateManyTasksPositions = new UpdateManyTasksPositionsUseCase(taskRepository)

    return updateManyTasksPositions
}