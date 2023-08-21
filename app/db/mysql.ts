import { createPool } from 'mysql2'

export class MysqlService {
	private static instance: MysqlService

	public static getInstance(): MysqlService {
		if (!MysqlService.instance) {
			MysqlService.instance = new MysqlService()
		}

		return MysqlService.instance
	}
	public MysqlCon = createPool({
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PWD,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
	}).promise()
}
