import { MysqlIns } from '../db/mysql'
import { Token, User } from '../models/user/user'
import { LoginInterface } from '../repo/app'

import jwt from 'jsonwebtoken'

export class LogimImp implements LoginInterface {
	async login(username: string, password: string): Promise<Token | null> {
		try {


			const [rows]: Array<any> = await (
				MysqlIns.getInstance().MysqlCon
			).execute('select * from User where nickname = ?', [username])

			if ((rows as Array<any>).length == 0) throw new Error('Usuario no existe')

			const user: User = {}

			rows.forEach((e: any) => {
				user.id = e['userid']
				user.admin = e['admin']
				user.nickname = e['nickname']
				user.nombre = e['nombre']
				user.password = e['password']
			})
			if (user.password !== password) throw new Error('Contraseña incorrecta')

			const token = jwt.sign(
				{ id: user.id, admin: user.admin },
				process.env.SECRET_TOKEN || '####,.--',
				{
					expiresIn: '7d',
				}
			)
			return { value: token }
		} catch (error) {
			throw error
		}
	}
}
