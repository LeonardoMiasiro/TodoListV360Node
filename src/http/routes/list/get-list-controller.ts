import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import {makeListFactory} from "../../../factories/list/make-list-factory";

export function getListController(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get("/list/:id", {
        schema: {
           params: z.object({
               id: z.string()
           })
        }
    }, async (request, reply) => {
        const {id} = request.params
        const useCase = makeListFactory()
        const list = await useCase.execute({id})

        return reply.status(200).send({
            list
        })
    })
}