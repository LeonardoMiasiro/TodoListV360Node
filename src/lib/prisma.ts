import {PrismaClient} from "@prisma/client";

export const prisma = new PrismaClient()
console.log(process.env.DATABASE_URL)