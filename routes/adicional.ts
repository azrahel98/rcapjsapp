import { Router } from 'express'
import { AdicionalImpl } from '../app/implement/adicional'
import { verifyToken } from './jwt/auth'


const router = Router()
const adImp = new AdicionalImpl()

router.post('/funcionarios', verifyToken,async (_req, res) => {
	try {
		const result = await adImp.buscar_funcionarios()

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
