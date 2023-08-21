import { Router } from 'express'
import { EmployImp } from '../app/implement/employ'
import { verifyToken } from './jwt/auth'


const router = Router()
const employim = new EmployImp()

router.post('/', verifyToken,async (req, res) => {
	try {
        const {nombre} = req.body
        if (!nombre) throw 'campos vacios'
		const result = await employim.buscar_employVw(nombre)
		console.log(result)
        res.json(result)
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
})

router.post('/search', verifyToken,async (req, res) => {
	try {
        const {dni} = req.body
        if (!dni) throw 'campos vacios'
		const result = await employim.buscar_employ(dni)
        res.json(result)
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
})

export default router
