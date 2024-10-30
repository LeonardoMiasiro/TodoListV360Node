import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {makeGetAllListFactory} from "../../../factories/list/make-get-all-list-factory";

export function getAllListController(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get("/listAll", {
    }, async (request,reply) => {
        const useCase = makeGetAllListFactory()
        const {list} = await useCase.execute()

        return reply.status(200).send({
            list
        })
    })
}