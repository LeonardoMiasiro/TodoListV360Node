import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import {makeUpdateTaskFactory} from "../../../factories/task/make-update-task-factoy";

export function updateTaskController(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put("/task/:id", {
        schema: {
            params: z.object({
                id: z.string()
            }),
            body: z.object({
                name: z.string(),
                description: z.string().nullable().default(null),
                listId: z.string(),
                listPosition: z.number()
            })
        }
    },async (request, reply) => {
        const id = request.params.id
        const body = request.body
        const useCase = makeUpdateTaskFactory()
        const task = await useCase.execute({
            ...body,
            id,
        })

        return reply.status(200).send({
            task
        })
    })
}