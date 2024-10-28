import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';
import {prisma} from "../src/lib/prisma";
import * as console from "node:console";


function generateUniqueDatabaseURL(schemaId: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provider a DATABASE_URL environment variable.');
    }

    const url = new URL(process.env.DATABASE_URL);

    url.searchParams.set('schema', schemaId);
    console.log(url)
    return url.toString();
}

const schemaId = randomUUID();

beforeAll(async () => {
    const databaseURL = generateUniqueDatabaseURL(schemaId);

    process.env.DATABASE_URL = databaseURL;

    execSync('npx prisma migrate deploy');
});

afterAll(async () => {
    console.log(schemaId)
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
    await prisma.$disconnect;

});