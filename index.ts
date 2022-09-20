import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { MysqlIns } from './src/db/mysql'
import { router } from './routes/login'
import { dRoute } from './routes/doc'
import { eroute } from './routes/employ'
import { verifyToken } from './routes/auth/jwt'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use('/login', router)
app.use('/doc', dRoute)
app.use('/employ', verifyToken, eroute)

MysqlIns.Connect()

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
