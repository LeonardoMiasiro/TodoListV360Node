import {getListController} from "./get-list-controller";
import {FastifyInstance} from "fastify";
import {createListController} from "./create-list-controller";
import {deleteListController} from "./delete-list-controller";
import {updateListController} from "./update-list-controller";

export function listRoutes(app: FastifyInstance) {
    app.register(getListController)
    app.register(createListController)
    app.register(updateListController)
    app.register(deleteListController)
}