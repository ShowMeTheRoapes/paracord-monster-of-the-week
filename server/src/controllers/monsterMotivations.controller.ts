import * as Koa from 'koa'
import { Model } from 'mongoose'
import MonsterMotivationModel, { MonsterMotivation } from '../models/monsterMotivation.model'

export class MonsterMotivationController {
    private model: Model<MonsterMotivation>

    constructor(model = MonsterMotivationModel()) {
        this.model = model
    }

    public getMonsterMotivations: Koa.Middleware = async ctx => {
        ctx.status = 200
        ctx.body = { result: await this.model.find().exec() }
    }
}
