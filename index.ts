import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { MysqlIns } from './src/db/mysql'
import { router } from './routes/login'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use('/login', router)

MysqlIns.Connect()

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
