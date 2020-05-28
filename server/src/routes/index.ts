import * as combineRouters from 'koa-combine-routers'
import monsterRouter from './monsters.route'

const router = combineRouters(monsterRouter)

export default router
