import {z} from "zod";
import * as process from "node:process";

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['dev','test']).default('dev')
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error('❌ Invalid environment variable', _env.error.format());

    throw new Error('Invalid environment variables.');
}

export const env = _env.data
