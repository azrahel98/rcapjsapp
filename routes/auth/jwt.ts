import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const verifyToken = (req: any, res: any, next: NextFunction) => {
	const token = req.header('token')
	if (!token) return res.status(401).json({ error: 'Acceso denegado' })
	try {
		const verified = jwt.verify(token, process.env.SECRET_TOKEN || '####,.--1')
		req.user = verified
		next()
	} catch (error) {
		res.status(400).json({ error: 'token no es válido' })
	}
}
