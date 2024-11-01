import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import {makeGetTaskFactory} from "../../../factories/task/make-get-task-factory";

export function getTaskController(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get("/task/:id", {
        schema: {
            params: z.object({
                id: z.string()
            })
        }
    },async (request, reply) => {
        const {id} = request.params
        const useCase = makeGetTaskFactory()
        const {task} = await useCase.execute({id})

        return reply.status(200).send({
            task
        })
    })
}