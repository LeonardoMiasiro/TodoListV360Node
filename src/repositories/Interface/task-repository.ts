import {Prisma, Task} from "@prisma/client";

export interface TaskRepository {
    getById(id: string): Promise<Task | null>;
    create(task: Prisma.TaskCreateInput): Promise<string>;
    update(taskId: string,task: Prisma.TaskUpdateInput): Promise<void>;
    delete(id: string): Promise<void>;
}