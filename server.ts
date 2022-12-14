import express from 'express'
// import morgan from "morgan"
import 'dotenv/config'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import bearerToken from 'express-bearer-token'
import errorMiddleware from './src/middlewares/error.middleware'
import swaggerUi from 'swagger-ui-express'
import { Umzug, SequelizeStorage } from 'umzug'
import { startListeners } from './src/web3'
import swaggerDocument from './swagger.json'

const app = express()
const port = process.env.PORT ?? 3000

const cors = require('cors')
if (process.env.NODE_ENV === 'production') {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  )
} else {
  app.use(
    cors({
      origin: '*',
      credentials: false,
    })
  )
}

app.use(bearerToken())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

import db from './src/db'
db.sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    console.log('Synced db.')
  })
  .then(() => {
    const seeder = new Umzug({
      migrations: { glob: 'seeders/*.js' },
      context: db,
      storage: new SequelizeStorage({ sequelize: db.sequelize }),
      logger: console,
    })
    seeder.up()
  })
  .catch(err => {
    console.log('Failed to sync db: ' + err.message)
  })

startListeners()

app.use(morgan('tiny'))

app.get('/', async (req, res) => {
  res.send('Hello there')
})
require('./src/routes/index.routes.ts')(app)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Tasks server listening at http://localhost:${port}`)
})
