import { MysqlService } from '../db/mysql'
import { Usuario } from '../models/dbnames'
import { LoginRepo } from '../repository/repos'
import jwt from 'jsonwebtoken'

export class LoginImp implements LoginRepo {
	async login(username: string, password: string): Promise<string> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).query('select * from Usuario where username = ?', [username])

			if (result.length === 0) throw 'Usuario no existe'
			const user: Usuario = result[0]
			if (user.password != password) throw 'Contraseña incorrecta'
			const token = jwt.sign(
				{
					id: user.id,
					admin: user.admin,
				},
				process.env.SECRET_TOKEN as string,
				{
					expiresIn: '7d',
				}
			)
			return token
		} catch (error) {
			throw error
		}
	}
}
