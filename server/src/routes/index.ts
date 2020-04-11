import * as combineRouters from 'koa-combine-routers'
import monsterMotivationsRouter from './monsterMotivations.route'

const router = combineRouters(monsterMotivationsRouter)

export default router
