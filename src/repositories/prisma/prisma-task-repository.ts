import {Prisma, Task} from "@prisma/client";
import {TaskRepository} from "../Interface/task-repository";
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

    async create(task: Prisma.TaskCreateInput): Promise<void> {
        await prisma.task.create({
            data: task
        })
    }

    async update(taskId: string, task: Prisma.TaskUpdateInput): Promise<void> {
        await prisma.task.update({
            where: {
                id: taskId,
            },
            data: task
        })
    }
}