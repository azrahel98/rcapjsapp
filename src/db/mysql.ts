import { createConnection } from 'mysql2/promise'

export class MysqlIns {
	private static instance: MysqlIns
	public static getInstance(): MysqlIns {
		if (!MysqlIns.instance) {
			MysqlIns.instance = new MysqlIns()
		}
		return MysqlIns.instance
	}
	public readonly MysqlCon = createConnection({
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PWD,
	})

	public static async Connect() {
		try {
			await (await MysqlIns.getInstance().MysqlCon).connect()
		} catch (error) {
			console.log('Errro')
		}
	}
}
