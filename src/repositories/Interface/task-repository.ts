import {Task} from "@prisma/client";

export interface TaskRepository {
    getById(id: string): Promise<Task | undefined>;
}