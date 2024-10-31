import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import { makeUpdateManyTasksPositionsFactory } from "src/factories/task/make-update-many-tasks-positions-factory";

export function updateManyTasksPositionsController(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put("/tasks/positions", {
        schema: {
            body: z.array(z.object({
                taskId: z.string(),
                position: z.number()
            }))
        }
    },async (request, reply) => {
        const body = request.body
        const useCase = makeUpdateManyTasksPositionsFactory()
        await useCase.execute(body)

        return reply.status(200).send()
    })
}