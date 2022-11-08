import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const verifyToken = (req: any, res: any, next: NextFunction) => {
	const token = req.header('token')
	if (!token) return res.status(401).json({ error: 'Acceso denegado' })
	try {
		console.log(process.env.SECRET_TOKEN)
		const verified = jwt.verify(token, process.env.SECRET_TOKEN as string)
		req.user = verified
		next()
	} catch (error) {
		console.log(error)
		res.status(400).json({ error: 'token no es válido' })
	}
}
