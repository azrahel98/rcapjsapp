import { Router } from 'express'
import { EmployImpl } from '../src/app/employImpl'

const eroute = Router()
const eimpl = new EmployImpl()

eroute.post('/', async (req, res) => {
	try {
		const { nombre } = req.body
		if (nombre == undefined) return res.json({ message: 'campos incorrectos' })
		const token = req.header('token')
		const datos = await eimpl.buscar_porNombre(nombre, true, token)
		res.json({ data: datos })
	} catch (error) {
		res.status(401).send({ message: 'errorrr' })
	}
})
eroute.post('/search', async (req, res) => {
	try {
		const { dni } = req.body
		if (dni == undefined) return res.json({ message: 'campos incorrectos' })
		const data = await eimpl.buscar_Empleados(dni, true)
		res.json({ data: data })
	} catch (error) {
		res.status(401).send({ message: 'errorrr' })
	}
})

eroute.get('/count', async (req, res) => {
	try {
		const data = await eimpl.empleadosActivos()
		res.json({ cantidad: data })
	} catch (error) {
		res.status(401).send({ message: 'errorrr' })
	}
})

export { eroute }
