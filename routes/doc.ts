import { Router } from 'express'
import { DocImpl } from '../src/app/docImpl'
import moment from 'moment'

const dRoute = Router()
const dd = new DocImpl()

dRoute.post('/', async (req, res) => {
	try {
		const { dni, nombre, fecha, doct, docpe, descr, ref, inicio, fin, activo } =
			req.body
		if (
			!dni &&
			!nombre &&
			!fecha &&
			!doct &&
			!docpe &&
			!descr &&
			!ref &&
			!inicio &&
			!fin
		)
			return res.status(400).json({ message: 'sin parametros' })
		if (!moment(fecha, 'YYYY-MM-DD').isValid())
			return res.status(400).json({ message: 'formato de fecha incorrecta' })

		const doc = await dd.create_doc(
			{
				dni,
				docName: nombre,
				fecha,
				tipoD: doct,
				tipoP: docpe,
				ref,
				descrip: descr,
				inicio,
				fin,
			},
			true
		)
		res.json(doc)
	} catch (error) {
		res.status(401).json({ message: (error as Error).message })
	}
})

dRoute.post('/ppcreate', async (req, res) => {
	try {
		const { dni, fecha, pp, descrip, permiso, detalle } = req.body
		if (!dni && !pp && !fecha && !descrip)
			return res.status(400).json({ message: 'sin parametros' })
		if (!moment(fecha, 'YYYY-MM-DD').isValid())
			return res.status(400).json({ message: 'formato de fecha incorrecta' })

		const doc = await dd.create_pp({
			descrip,
			detalle,
			dni,
			fecha,
			permiso,
			pp,
		})
		res.json(doc)
	} catch (error) {
		res.status(401).json({ message: (error as Error).message })
	}
})

dRoute.post('/docs', async (req, res) => {
	try {
		const { dni, mes } = req.body
		if (!dni && !mes) return res.json({ message: 'campos vacios' })
		const docs = await dd.buscar_documentos(dni, mes)
		res.json(docs)
	} catch (error) {
		res.status(401).json({ message: (error as Error).message })
	}
})

dRoute.post('/pps', async (req, res) => {
	try {
		const { dni, mes } = req.body
		if (!dni && !mes) return res.json({ message: 'campos vacios' })
		const docs = await dd.buscar_papeletas(dni, mes)
		res.json(docs)
	} catch (error) {
		res.status(401).json({ message: (error as Error).message })
	}
})

dRoute.post('/marcaciones', async (req, res) => {
	try {
		const { dni, mes } = req.body
		if (!dni && !mes) return res.json({ message: 'campos vacios' })
		const docs = await dd.buscar_marcaciones(dni, mes)
		res.json(docs)
	} catch (error) {
		res.status(401).json({ message: (error as Error).message })
	}
})

export { dRoute }
