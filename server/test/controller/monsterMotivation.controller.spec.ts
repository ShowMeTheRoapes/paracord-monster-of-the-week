import DBConnector from '../../src/database'
import env from '../../src/environment'
import * as mongoose from 'mongoose'
import MonsterMotivationModel from '../../src/models/monsterMotivation.model'
import {MonsterMotivationController} from '../../src/controllers/monsterMotivations.controller'
import { fakeKoaContext, fakeKoaNext } from '../helpers/koa.helper'

beforeAll(async () => {
    const dbConnector = new DBConnector().setDB(env.mongo.testDb)
    const url = dbConnector.buildMongoURL()
    mongoose.set('useCreateIndex', true)
    await mongoose.connect(url, dbConnector.buildMongoOptions())
})

beforeEach(async () => {
    await MonsterMotivationModel().deleteMany({})
})

afterAll(async () =>{
    await mongoose.disconnect()
})

const model = MonsterMotivationModel()

describe('Monster Motication Controller', () => {
    describe('getMonsterMotivations', () => {
        const controller = new MonsterMotivationController(model)
        test('returns a status of 200', async () => {
            const ctx = fakeKoaContext()

            await controller.getMonsterMotivations(ctx, fakeKoaNext)
            expect(ctx.status).toBe(200)
        })

        test('returns an empty result array when no monster motivations exist', async () => {
            const ctx = fakeKoaContext()
            await controller.getMonsterMotivations(ctx, fakeKoaNext)
            expect(ctx.body.result).toBeTruthy()
            expect(ctx.body.result).toStrictEqual([])
        })

        test('returns an array of monster motivations when they exist', async () => {
            const ctx = fakeKoaContext()
            const resultCount = Math.floor(Math.random() * 10 + 1)

            for(let i = 0; i < resultCount; i++){
                await model.create({
                    name: `RandomName_${Math.random()}`,
                    description: `RandomDescription_${Math.random()}`,
                    rarity: Math.floor(Math.random() * 10 + 1)
                })
            }
            
            await controller.getMonsterMotivations(ctx, fakeKoaNext)
            expect(ctx.body.result).toBeTruthy()
            expect(ctx.body.result.length).toBe(resultCount)
        })
    })
})