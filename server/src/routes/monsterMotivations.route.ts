import Router = require('koa-router')
import { MonsterMotivationController } from '../controllers/monsterMotivations.controller'
const monsterMotivationsController = new MonsterMotivationController()

const router = new Router({ prefix: '/v1/monster-motivations' })

router.get('/', monsterMotivationsController.getMonsterMotivations)

export default router
