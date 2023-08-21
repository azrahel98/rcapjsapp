import { Router } from 'express'
import { AsistenciaImpl } from '../app/implement/asistencia'
import { DocumentosImpl } from '../app/implement/documentos'
// import { DetalleDocumentosWithDefaults } from '../app/models/dbnames'

import { verifyToken } from './jwt/auth'

const router = Router()
const asisImp = new AsistenciaImpl()
const docim = new DocumentosImpl()

router.post('/', verifyToken, async (req, res) => {
	try {
		const { dni, mes, year } = req.body

		if (!dni || !mes || !year) throw 'parametros vacios'

		if (dni.length !== 8) throw 'dni incorrecto'
		if (!Number.isInteger(mes) || !Number.isInteger(year)) throw 'formato incorrecto'

		const docranges = await docim.buscarDocsWithRanges(dni, mes, year)
		const data = await asisImp.buscar_registros(dni, mes, year)
		const doc = await docim.buscarDocsWithDate(dni, mes, year)
		res.json({ registros: data, ranges: docranges, doc })
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
})

router.post('/eliminar', verifyToken, async (req, res) => {
	try {
		const { dni, fecha } = req.body

		if (!dni || !fecha) throw 'parametros vacios'

		if (dni.length !== 8) throw 'dni incorrecto'
		if (isNaN(Date.parse(fecha))) throw 'formato incorrecto'

		const data = await asisImp.eliminar_asistencia(fecha, dni)

		res.json({ data })
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
})

router.post('/add', verifyToken, async (req, res) => {
	try {
		const { dni, fecha, falta, tardanza } = req.body

		console.log(req.body)

		if (!dni || !fecha) throw 'parametros vacios'

		if (dni.length !== 8) throw 'dni incorrecto'
		if (!Number.isInteger(tardanza) || isNaN(Date.parse(fecha)))
			throw 'formato incorrecto'

		const data = await asisImp.añadir_asistencia(dni, fecha.toString(), tardanza, falta)

		res.json({ data })
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
})

router.post('/search', verifyToken, async (req, res) => {
	try {
		const { dni, mes, year } = req.body

		if (!dni || !mes || !year) throw 'parametros vacios'

		if (dni.length !== 8) throw 'dni incorrecto'
		if (!Number.isInteger(mes) || !Number.isInteger(year)) throw 'formato incorrecto'

		const data = await asisImp.buscar_asistencia(dni, mes, year)
		res.json(data)
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
})

export default router
