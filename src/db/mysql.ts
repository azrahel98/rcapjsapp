import bluebird from 'bluebird'
import { createPool } from 'mysql2'
import { createConnection } from 'mysql2/promise'

export class MysqlIns {
	private static instance: MysqlIns

	public static getInstance(): MysqlIns {
		if (!MysqlIns.instance) {
			MysqlIns.instance = new MysqlIns()
		}
		return MysqlIns.instance
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
