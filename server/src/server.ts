import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-body'
import * as cors from 'koa2-cors'
import errorHandler from './middleware/error-handler.middleware'
import * as KoaLogger from 'koa-logger-winston'
import logger from './util/logger.util'
import DBConnector from './database'
import env from './environment'

async function runServer(): Promise<void> {
    await new DBConnector().connect()

    const app = new Koa()
    const router = new Router()
    const port = env.port || 8000

    // Keep these as early as possible, takes care of parsing JSON, logging, and error handling
    app.use(cors())
    app.use(bodyParser())
    app.use(KoaLogger(logger))
    app.use(errorHandler)

    // TODO Extract these routes somewhere that makes more sense
    router.get('/error', async () => {
        throw new Error('This is what will happen when there is a problem!')
    })
    router.get('/', async ctx => {
        logger.info(`A route was called! It looked like ${ctx.path}!`)
        ctx.body = 'This will be the Monster of the Week game API!'
    })

    app.use(router.routes())
    app.use(router.allowedMethods())

    app.listen(port, () => logger.info(`Monster of the Week Server listening on port ${port}!`))
}

runServer()
