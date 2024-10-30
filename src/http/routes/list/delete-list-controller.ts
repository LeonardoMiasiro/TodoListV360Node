import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import {makeDeleteListFactory} from "../../../factories/list/make-delete-list-factory";

export function deleteListController(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete("/list/:id", {
        schema: {
            params: z.object({
                id: z.string()
            })
        }
    }, async (request, reply) => {
        const {id} = request.params
        const useCase = makeDeleteListFactory()
        await useCase.execute({id})

        return reply.status(200).send()
    })
}