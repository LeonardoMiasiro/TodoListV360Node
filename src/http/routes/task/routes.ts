import {FastifyInstance} from "fastify";
import {getTaskController} from "./get-task-controller";
import {createTaskController} from "./create-task-controller";
import {updateTaskController} from "./update-task-controller";
import {deleteTaskController} from "./delete-task-controller";

export function taskRoutes(app: FastifyInstance) {
    app.register(getTaskController)
    app.register(createTaskController)
    app.register(updateTaskController)
    app.register(deleteTaskController)
}

