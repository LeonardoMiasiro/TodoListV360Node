import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import {makeUpdateListFactory} from "../../../factories/list/make-update-list-factory";

export function updateListController(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put("/list/:id", {
        schema: {
            params: z.object({
                id: z.string()
            }),
            body: z.object({
                name: z.string(),
                position: z.number()
            })
        }
    },
        async (request, reply) => {
            const id = request.params.id
            const body = request.body
            const useCase = makeUpdateListFactory()
            const list = await useCase.execute({
                ...body,
                id,
            })

            return reply.status(200).send({
                list
            })
        })
}