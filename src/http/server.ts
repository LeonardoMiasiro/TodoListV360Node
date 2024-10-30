import  {fastify} from "fastify";
import {serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod";
import * as fastifyCors from "@fastify/cors";
import {healthCheck} from "./routes/api";
import {taskRoutes} from "./routes/task/routes";
import {listRoutes} from "./routes/list/routes";
import { ZodError} from "zod";
import {ErrorHandlerGlobal} from "../use-cases/_errors/error-handler";
import {env} from "../env/env";

export const app = fastify().withTypeProvider <ZodTypeProvider> ()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

//app.register(fastifyCors)
app.register(healthCheck)
app.register(taskRoutes)
app.register(listRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError){
        return reply.status(400).send({
            message: 'Validation error', issues: error.format()
        });
    }
    console.log(error)
    if (error instanceof ErrorHandlerGlobal) {
        return reply.status(error.statusCode).send({
            message: error.message
        })
    }

    return reply.status(500).send({
        message: 'Internal Server Error.', issues: error
    });
});

if(env.NODE_ENV !== 'test') {
    app.listen({port: 3333, host: "localhost"}).then( () => console.log("Server started"))
}