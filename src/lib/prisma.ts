import {PrismaClient} from "@prisma/client";
import { randomUUID } from "node:crypto";
import {env} from "../env/env";

class PrismaSingleton extends PrismaClient {
    private schema: string
    constructor(){
        if (!env.DATABASE_URL) {
            throw new Error('Please provide a DATABASE_URL environment variable');
        }

        let database_url = env.DATABASE_URL

        if(env.NODE_ENV === 'test') {
            const schema = randomUUID();

            const url = new URL(env.DATABASE_URL);

            url.searchParams.set('schema', schema);

            database_url = url.toString()

            process.env.DATABASE_URL = database_url;
        }
        super()
        this.schema = database_url
    }

    async deleteSchema() {
        try {
            await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
            await prisma.$disconnect()
        } catch (error) {
            console.error(error)
        }
    }
}

export const prisma = new PrismaSingleton()