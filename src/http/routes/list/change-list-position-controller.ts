import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import {makeChangeListPositionListFactory} from "../../../factories/list/make-change-list-position-factory";

export function changeListPositionController(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put("/listPositionChange/:id", {
            schema: {
                params: z.object({
                    id: z.string()
                }),
                body: z.object({
                    position: z.number()
                })
            }
        },
        async (request, reply) => {
            const id = request.params.id
            const position = request.body.position
            const useCase = makeChangeListPositionListFactory()
            const list = await useCase.execute({
                position,
                id,
            })

            return reply.status(200).send({
                list
            })
        })
}