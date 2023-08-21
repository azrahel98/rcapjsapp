import express from 'express'
import dotenv from 'dotenv'
import DocRoutes from './routes/document'
import LoginRoute from './routes/login'
import EmployRoute from './routes/employ'
import AsistenRoute from './routes/asistencia'
import Adicional from './routes/adicional'

import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/empleado',EmployRoute)
app.use('/doc',DocRoutes)
app.use('/login', LoginRoute)
app.use('/asistencia',AsistenRoute)
app.use('/otros',Adicional)
app.listen(port)
