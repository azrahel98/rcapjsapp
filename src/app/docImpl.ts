import { MysqlIns } from '../db/mysql'
import { Doc } from '../models/doc/doc'
import { PP } from '../models/doc/pp'
import { DocRepository } from '../repo/doc_r'
import mysql, { QueryError } from 'mysql2'

export class DocImpl implements DocRepository {
	async create_doc(doc: Doc, range: boolean): Promise<Doc | null> {
		try {
			if (this.check(doc)) throw 'parametros vacios'
			const d = await (
				await MysqlIns.getInstance().MysqlCon
			).execute(
				'insert into Doc(dni,doc,fecha,TipoDoc,tipoper,descrip,ref,inicio,fin) values(?,?,?,?,?,?,?,?,?)',
				[
					doc.dni,
					doc.docName,
					doc.fecha,
					doc.tipoD,
					doc.tipoP,
					doc.descrip,
					doc.ref,
					doc.inicio,
					doc.fin,
				]
			)
			console.log(d)
			return null
		} catch (error) {
			if (((error as QueryError).code = 'ER_NO_REFERENCED_ROW_2'))
				throw new Error('Dni no existe')
			throw new Error('Error desconocido')
		}
	}

	async edit_doc(doc: Doc): Promise<Doc> {
		throw new Error('Method not implemented.')
	}
	async delete_doc(docId: number): Promise<number> {
		throw new Error('Method not implemented.')
	}
	async create_pp(pp: PP): Promise<Doc> {
		throw new Error('Method not implemented.')
	}
	async edit_pp(pp: PP): Promise<Doc> {
		throw new Error('Method not implemented.')
	}
	async delete_pp(ppId: number): Promise<number> {
		throw new Error('Method not implemented.')
	}

	check(ob: Record<string, any>): boolean {
		return Object.keys(ob).length === 0
	}
}
