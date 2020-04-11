import Router = require('koa-router')
import { MonsterMotivationController } from '../controllers/monsterMotivations.controller'
const monsterMotivationsController = new MonsterMotivationController()

const router = new Router({ prefix: '/v1/monster' })

router.get('/motivations', monsterMotivationsController.getMonsterMotivations)

export default router
