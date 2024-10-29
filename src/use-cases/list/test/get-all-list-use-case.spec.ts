import {beforeEach, describe, expect} from "vitest";
import {prisma} from "../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {makeGetAllListFactory} from "../../../factories/list/make-get-all-list-factory";
import {execSync} from "node:child_process";

describe('Get All List', () => {
    const sut = makeGetAllListFactory()
    const listId = randomUUID()

    beforeAll(async () => {
        execSync('npx prisma migrate dev');
    });

    afterAll(async () => {
        await prisma.deleteSchema()
    });

    beforeEach(async () => {
        for (let i = 0; i < 4; i++) {
            await prisma.list.create({
                data: {
                    id: listId + i,
                    name: 'Lista 1',
                    position: 199
                }
            })
        }
    })

    it('should be able to get all lists', async () => {
        const {list} = await sut.execute()

        expect(list).toHaveLength(4)
        expect(list).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'Lista 1'
                })
            ])
        )
    });
})