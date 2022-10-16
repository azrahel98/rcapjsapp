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
	public MysqlCon = createConnection({
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PWD,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
	})

	public static async Connect() {
		try {
			await (await MysqlIns.getInstance().MysqlCon).connect()
		} catch (error) {
			throw error
		}
	}

	public async connection(){
		
	}
}
