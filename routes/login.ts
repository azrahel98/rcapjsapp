import { Router } from 'express'
import { MysqlIns } from '../src/db/mysql'

const router = Router()

router.post('/', async (req, res) => {
	const { user, password } = req.body

	if (user == undefined || password == undefined)
		return res.send({
			Error: 'Campos incompletos',
		})
	if (user !== 'raul' && password !== 'raul') {
		return res.send({ Error: 'Contraseñas in' })
	}

	try {
		const [rows, fields] = await (
			await MysqlIns.getInstance().MysqlCon
		).execute('select * from User')

		return res.send(rows)
	} catch (error) {
		res.send(error)
	}
})

router.get('/', (req, res) => {
	res.send({
		TEST: 'S',
	})
})

export { router }
