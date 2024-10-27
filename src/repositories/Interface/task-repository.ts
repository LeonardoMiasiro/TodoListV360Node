import {Prisma, Task} from "@prisma/client";

export interface TaskRepository {
    getById(id: string): Promise<Task | null>;
    create(task: Prisma.TaskCreateInput): Promise<void>;
    update(taskId: string,task: Prisma.TaskUpdateInput): Promise<void>;
}