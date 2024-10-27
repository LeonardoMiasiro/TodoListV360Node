import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import {makeDeleteTaskFactory} from "../../../factories/task/make-delete-task-factory";

export function deleteTaskController(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete("/task/:id", {
        schema: {
            params: z.object({
                id: z.string()
            })
        }
    },async (request, reply) => {
        const {id} = request.params
        const useCase = makeDeleteTaskFactory()
        const task = await useCase.execute({id})

        return reply.status(200).send({
            task
        })
    })
}