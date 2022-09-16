import { MysqlIns } from '../db/mysql'
import { Token } from '../models/user/user'
import { LoginInterface } from '../repo/app'

class LogimImp implements LoginInterface {
	async login(username: string, password: string): Promise<Token | null> {
		try {
			const db = MysqlIns.getInstance()

			return null
		} catch (error) {
			return null
		}
	}
}
