import e, { json, Router } from 'express'
import { LogimImp } from '../src/app/login'
import { verifyToken } from './auth/jwt'

const router = Router()
const logi = new LogimImp()

router.post('/', async (req, res) => {
	try {
		const { user, password } = req.body
		if (user == undefined || password == undefined)
			return res.json({
				error: 'Campos incompletos',
			})

		res.json(await logi.login(user, password))
	} catch (error) {
		res.status(401).send((error as Error).message)
	}
})

router.get('/', verifyToken, (req, res) => {
	res.send({
		TEST: 'S',
	})
})

export { router }
