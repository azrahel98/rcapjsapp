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

		await dd.create_doc(
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
		res.send({ sdfad: 's' })
	} catch (error) {
		res.status(401).json({ message: (error as Error).message })
	}
})

export { dRoute }
