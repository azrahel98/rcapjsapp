import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { MysqlIns } from './src/db/mysql'
import { router } from './routes/login'
import { dRoute } from './routes/doc'
import { eroute } from './routes/employ'
import { verifyToken } from './routes/auth/jwt'
import { asRoute } from './routes/asistencia'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/login', router)
app.use('/doc', verifyToken, dRoute)
app.use('/employ', verifyToken, eroute)
app.use('/asist', verifyToken, asRoute)


app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
