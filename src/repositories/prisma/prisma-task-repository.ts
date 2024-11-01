import {Prisma, Task} from "@prisma/client";
import {TaskRepository, updateManyPositionsProps} from "../Interface/task-repository";
import {prisma} from "../../lib/prisma";

export class PrismaTaskRepository implements TaskRepository {
    async getById(id: string): Promise<Task | null> {
        const task = await prisma.task.findUnique({
            where: {
                id: id
            }
        })
        return task
    }

    async create(task: Prisma.TaskCreateInput): Promise<string> {
        const newtask = await prisma.task.create({
            data: task
        })
        return newtask.id
    }

    async update(taskId: string, task: Prisma.TaskUpdateInput): Promise<void> {
        await prisma.task.update({
            where: {
                id: taskId,
            },
            data: task
        })
    }

    async updateManyPositions(tasksPosition: updateManyPositionsProps[]): Promise<void> {
        await Promise.all(
            tasksPosition.map(task => prisma.task.update({
                data: {
                    listPosition: task.position
                },
                where: {
                    id: task.taskId
                }
            }))
        )
    }

    async delete(id: string): Promise<void> {
        await prisma.task.delete({
            where: {
                id: id
            }
        })
    }
}