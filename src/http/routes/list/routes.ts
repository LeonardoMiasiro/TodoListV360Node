import {getListController} from "./get-list-controller";
import {FastifyInstance} from "fastify";

export function listRoutes(app: FastifyInstance) {
    app.register(getListController)
}