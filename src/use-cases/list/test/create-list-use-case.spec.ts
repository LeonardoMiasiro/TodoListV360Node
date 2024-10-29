import {describe, expect} from "vitest";
import {makeCreateListFactory} from "../../../factories/list/make-create-list-factory";
import {prisma} from "../../../lib/prisma";
import {execSync} from "node:child_process";

describe('Create List', () => {
    const sut = makeCreateListFactory()

    beforeAll(async () => {
        execSync('npx prisma migrate dev');
    });

    afterAll(async () => {
        await prisma.deleteSchema()
    });

    it('should be able to create a List', async () => {
        await sut.execute({
            name: "Lista 1",
            position: 2
        })

        const list = await prisma.list.findFirst()

        expect(list?.name).toBe("Lista 1")
        expect(list?.position).toBe(2)
    })
})