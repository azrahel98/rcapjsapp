import { Router } from 'express'
import { LoginImp } from '../app/implement/login'

const router = Router()
const loimp = new LoginImp()

router.post('/', async (req, res) => {
	try {
		const { username, password } = req.body

		if (!username || !password) throw 'Campos vacios'

		const token = await loimp.login(username, password)
		return res.json({ token: token })
	} catch (error) {
		return res.status(400).json({
			error: {
				message: typeof error == 'string' ? error : (error as Error).message,
			},
		})
	}
})

export default router
