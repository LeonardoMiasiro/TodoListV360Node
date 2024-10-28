import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import {makeChangeTaskPositionTaskFactory} from "../../../factories/task/make-change-task-position-factory";

export function changeTaskPositionController(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put("/task/:id", {
        schema: {
            params: z.object({
                id: z.string()
            }),
            body: z.object({
                listId: z.string(),
                listPosition: z.number()
            })
        }
    },async (request, reply) => {
        const id = request.params.id
        const body = request.body
        const useCase = makeChangeTaskPositionTaskFactory()
        const task = await useCase.execute({
            ...body,
            id,
        })

        return reply.status(200).send({
            task
        })
    })
}