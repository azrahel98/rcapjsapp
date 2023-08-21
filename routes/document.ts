import { Router } from 'express'
// import { DetalleDocumentosWithDefaults } from '../app/models/dbnames'
import { DocumentosImpl } from '../app/implement/documentos'
import {
	DocumentosWithDefaults,
	TipoDocumento,
	PermisosActivos,
} from '../app/models/dbnames'
import { verifyToken, verifyTokenAdmin } from './jwt/auth'

const router = Router()
const documImp = new DocumentosImpl()

router.post('/create', verifyTokenAdmin, async (req, res) => {
	try {
		const { fecha, tipo, nombre, detalle, docId } = req.body

		if (!fecha || !tipo || !nombre) throw 'parametros incoompletos'
		if (!Array.isArray(detalle)) throw 'parametros incompletos - detalle'
		if (isNaN(Date.parse(fecha))) throw 'Formato de fecha incorrecta'
		if (!(tipo in TipoDocumento)) throw 'Tipo de documento incorrecto'

		detalle.forEach((e: any) => {
			const { descripcion, fecha, dni, asunto, inicio, fin } = e
			if (!descripcion || !dni || !asunto) throw 'detalle incorrecto'
			if (fecha) {
				if (isNaN(Date.parse(fecha))) throw 'Formato de fecha incorrecta - detalle'
			}
			if (!(asunto in PermisosActivos)) throw 'Tipo de permiso incorrecto - detalle'
			if (inicio && fin) {
				if (isNaN(Date.parse(inicio)))
					throw 'Formato de fecha incorrecta - detalle - inicio'
				if (isNaN(Date.parse(fin))) throw 'Formato de fecha incorrecta - detalle - fin'
			}
		})

		var docu: DocumentosWithDefaults = {
			fecha: new Date(fecha),
			tipo: tipo,
			nombre: nombre,
			docId: docId,
		}

		var newDocument = await documImp.crear_doc(docu, detalle)

		return res.json(newDocument)
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
	// documImp.crear_doc()
})

router.post('/search', verifyToken, async (req, res) => {
	try {
		const { nombre } = req.body
		if (!nombre) throw 'Falta campos'

		const result = await documImp.buscar_doc(nombre)
		return res.json(result)
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
})

router.post('/anular', verifyToken, async (req, res) => {
	try {
		const { docid, estado } = req.body
		if (!docid) throw 'Falta campos'

		const result = await documImp.anular_doc(docid, estado)
		return res.json(result)
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
})

router.post('/eliminardetalle', verifyToken, async (req, res) => {
	try {
		const { docid } = req.body
		if (!docid) throw 'Falta campos'

		const result = await documImp.eliminar_doc(docid)
		return res.json(result)
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
})

router.post('/searchByName', verifyToken, async (req, res) => {
	try {
		const { nombre } = req.body
		if (!nombre) throw 'Falta campos'

		const result = await documImp.buscar_doc_byLike(nombre)
		return res.json(result)
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
})

router.post('/searchById', verifyToken, async (req, res) => {
	try {
		const { id } = req.body
		if (!id) throw 'Falta campos'

		const result = await documImp.buscar_byIdDoc(id)
		return res.json(result)
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
})

router.post('/searchByDni', verifyToken, async (req, res) => {
	try {
		const { dni } = req.body
		if (!dni) throw 'Falta campos'

		const result = await documImp.buscar_doc_dni(dni)
		return res.json(result)
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
})

router.post('/searchDetalle', verifyToken, async (req, res) => {
	try {
		const { id } = req.body
		if (!id) throw 'Falta campos'

		const result = (await documImp.buscar_doc_detalle(id)) as any
		return res.json(result)
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
})

export default router
