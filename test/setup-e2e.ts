import { execSync } from 'node:child_process';
import { prisma } from 'src/lib/prisma';

beforeAll(async () => {

    execSync('npx prisma migrate deploy');
});

afterAll(async () => {
    try {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "test" CASCADE`);
        await prisma.$disconnect()
    } catch (error) {
        console.error(error)
    }

});