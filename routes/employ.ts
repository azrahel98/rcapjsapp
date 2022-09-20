import { Router } from 'express'
import { EmployImpl } from '../src/app/employImpl'

const eroute = Router()
const eimpl = new EmployImpl()

eroute.post('/', async (req, res) => {
	try {
		const { nombre } = req.body
		if (nombre == undefined) return res.json({ message: 'campos incorrectos' })
		const datos = await eimpl.buscar_porNombre(nombre, true)
		res.json(datos)
	} catch (error) {
		res.status(401).send({ message: 'errorrr' })
	}
})

export { eroute }
