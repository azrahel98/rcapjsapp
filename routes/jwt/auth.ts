import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const verifyToken = (req: any, res: any, next: NextFunction) => {
	const token = req.header('token')
	if (!token) return res.status(401).json({ error: 'Acceso denegado' })
	try {
		const verified = jwt.verify(token, process.env.SECRET_TOKEN as string)

		req.user = verified
		next()
	} catch (error) {
		res.status(400).json({ error: 'token no es válido' })
	}
}


export const verifyTokenAdmin = (req: any, res: any, next: NextFunction) => {
	const token = req.header('token')
	if (!token) return res.status(401).json({ error: 'Acceso denegado' })
	try {
		const verified = jwt.verify(token, process.env.SECRET_TOKEN as string)
        var decode = jwt.decode(token) as any
        if (decode.admin !== 1) return res.status(401).json({ error: 'Acceso denegado' })
		req.user = verified
		next()
	} catch (error) {
		res.status(400).json({ error: 'token no es válido' })
	}
}