import {FastifyInstance} from "fastify";
import {getTaskController} from "./get-task-controller";
import {createTaskController} from "./create-task-controller";
import {updateTaskController} from "./update-task-controller";
import {deleteTaskController} from "./delete-task-controller";
import {changeTaskPositionController} from "./change-task-position-controller";
import {updateManyTasksPositionsController} from "./update-many-tasks-positions-controller";

export function taskRoutes(app: FastifyInstance) {
    app.register(getTaskController)
    app.register(createTaskController)
    app.register(updateTaskController)
    app.register(deleteTaskController)
    app.register(changeTaskPositionController)
    app.register(updateManyTasksPositionsController)
}

