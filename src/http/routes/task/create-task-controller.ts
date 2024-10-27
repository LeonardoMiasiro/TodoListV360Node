import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import {makeCreateTaskFactory} from "../../../factories/task/make-create-task-factory";

export function createTaskController(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/task", {
            schema: {
                body: z.object({
                    name: z.string(),
                    description: z.string().nullable().default(null),
                    listId: z.string(),
                    listPosition: z.number()
                }),
            }
    },async (request, reply) => {
        const useCase = makeCreateTaskFactory()
        const body = request.body
        const task = await useCase.execute(body)

        return reply.status(201).send({
            task
        })
    })
}