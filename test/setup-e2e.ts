import { execSync } from 'node:child_process';
import { prisma } from 'src/lib/prisma';
import {afterAll} from "vitest";
import {app} from "../src/http/server";

beforeAll(async () => {
    await app.ready()
    execSync('npx prisma migrate deploy');
});

afterAll(async () => {
    try {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "test" CASCADE`);
        await prisma.$disconnect()
        await app.close()
        console.log('12321')
    } catch (error) {
        console.error(error)
    }

});