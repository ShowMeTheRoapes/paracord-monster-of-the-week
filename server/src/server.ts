import * as Koa from 'koa'
import * as bodyParser from 'koa-body'
import * as cors from 'koa2-cors'
import errorHandler from './middleware/error-handler.middleware'
import * as KoaLogger from 'koa-logger-winston'
import logger from './util/logger.util'
import DBConnector from './database'
import env from './environment'
import router from './routes'

async function runServer(): Promise<void> {
    await new DBConnector().connect()

    const app = new Koa()
    const port = env.port || 8000

    // Keep these as early as possible, takes care of parsing JSON, logging, and error handling
    app.use(cors())
    app.use(bodyParser())
    app.use(KoaLogger(logger))
    app.use(errorHandler)

    app.use(router())

    app.listen(port, () => logger.info(`Monster of the Week Server listening on port ${port}!`))
}

runServer()
