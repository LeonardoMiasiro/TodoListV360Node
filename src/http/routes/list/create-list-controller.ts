import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import {makeCreateTaskFactory} from "../../../factories/task/make-create-task-factory";
import {makeCreateListFactory} from "../../../factories/list/make-create-list-factory";

export function createListController(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/list", {
        schema: {
            body: z.object({
                name: z.string(),
                position: z.number()
            }),
        }
    }, async (request, reply) => {
        const useCase = makeCreateListFactory()
        const body = request.body
        const task = await useCase.execute(body)

        return reply.status(200).send({
            task
        })
    })
}