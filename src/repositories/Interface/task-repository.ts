import {Prisma, Task} from "@prisma/client";

export interface updateManyPositionsProps {
    taskId: string
    position: number
}

export interface TaskRepository {
    getById(id: string): Promise<Task | null>;
    create(task: Prisma.TaskCreateInput): Promise<string>;
    update(taskId: string,task: Prisma.TaskUpdateInput): Promise<void>;
    updateManyPositions(tasksPosition: updateManyPositionsProps[]): Promise<void>;
    delete(id: string): Promise<void>;
}