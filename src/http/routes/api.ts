import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";

export async function healthCheck(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider> ().get("/healthCheck", () => {
        return "Server is running";
    })
}