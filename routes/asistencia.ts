import { Router } from 'express'
import moment from 'moment'
import { AsistImpl } from '../src/app/asistencia'

const asRoute = Router()
const asm = new AsistImpl()


asRoute.post('/', async (req, res) => {
    try {
        const { asist } = req.body
        if (!asist) return res.status(400).json({ message: 'sin parametros' })
        const par = 'dni' in asist && 'fecha' in asist
        if (!par) return res.status(400).json({ message: 'sin parametros' })
        if (!moment(asist['fecha']).isValid()) return res.status(400).json({ message: 'sin parametros' })
        const data = await asm.add(asist)
        return res.json(data)
    } catch (e) {
        res.status(401).json({ message: (e as Error).message })
    }
})
asRoute.post('/search', async (req, res) => {
    try {
        const { dni, mes, año } = req.body
        if (!dni && !mes && !año) return res.status(400).json({ message: 'sin parametros' })
        const data = await asm.search(dni, mes, año)
        return res.json(data)
    } catch (e) {
        res.status(401).json({ message: (e as Error).message })
    }
})

export { asRoute }