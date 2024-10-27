import {FastifyInstance} from "fastify";
import {getTaskController} from "./get-task-controller";
import {createTaskController} from "./create-task-controller";

export function taskRoutes(app: FastifyInstance) {
    app.register(getTaskController)
    app.register(createTaskController)
}

