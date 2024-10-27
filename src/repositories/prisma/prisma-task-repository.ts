import {Task} from "@prisma/client";
import {TaskRepository} from "../Interface/task-repository";
import {prisma} from "../../lib/prisma";

export class PrismaTaskRepository implements TaskRepository {
    async getById(id: string): Promise<Task | undefined> {
        const task = await prisma.task.findUnique({
            where: {
                id: id
            }
        })
        return task
    }
}
