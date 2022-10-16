import { MysqlIns } from '../db/mysql'
import { Doc } from '../models/doc/doc'
import { PP } from '../models/doc/pp'
import { DocRepository } from '../repo/doc_r'
import mysql, { QueryError } from 'mysql2'
import { RelojB } from '../models/asiste/asiste'

export class DocImpl implements DocRepository {
	async buscar_marcaciones(dni: string, mes: number): Promise<RelojB[] | null> {
		try {
			if (typeof dni === 'string' && dni.trim().length === 0)
				throw 'parametros vacios'
			const [result]: Array<any> = await (
				await MysqlIns.getInstance().MysqlCon
			).query(
				'select * from Asiste where dni = ? and MONTH (fecha) = ? ORDER by fecha  asc , hora ',
				[dni, mes]
			)

			const marc: Array<RelojB> = []

			result.forEach((e: any) => {
				marc.push({
					dni: e['dni'],
					hora: e['hora'],
					nombre: e['nombre'],
					reloj: e['reloj'],
					fecha: new Date(e['fecha']),
				})
			})

			return marc
		} catch (error) {
			throw new Error(error as string)
		}
	}
	async buscar_papeletas(dni: string, mes: number): Promise<PP[] | null> {
		try {
			if (typeof dni === 'string' && dni.trim().length === 0)
				throw 'parametros vacios'

			const [result]: Array<any> = await (
				await MysqlIns.getInstance().MysqlCon
			).query(
				'SELECT * FROM Papeleta  p where p.dni= ?  and month(fecha) = ?',
				[dni, mes]
			)
			const papeletas: Array<PP> = []

			result.forEach((e: any) => {
				papeletas.push({
					descrip: e['descr'],
					detalle: e['detalle'],
					dni: e['dni'],
					fecha: new Date(e['fecha']),
					permiso: e['permiso'],
					pid: e['papeletaid'],
					pp: e['papeleta'],
				})
			})

			return papeletas
		} catch (error) {
			throw new Error('ErrorbuscarPapeletas')
		}
	}
	async buscar_documentos(dni: string, mes: number): Promise<Doc[] | null> {
		try {
			if (typeof dni === 'string' && dni.trim().length === 0)
				throw 'parametros vacios'

			const [result]: Array<any> = await (
				await MysqlIns.getInstance().MysqlCon
			).query(
				`(select * from Doc d where MONTH (d.inicio) <= ? and MONTH (d.fin) >= ? and dni = ? ) UNION (select * from Doc d2 where dni = ? and MONTH(fecha) = ? )`,
				[mes, mes, dni, dni, mes]
			)
			const docs: Array<Doc> = []

			result.forEach((e: any) => {
				console.log(e['inicio'])
				docs.push({
					docId: e['docId'],
					dni: e['dni'],
					docName: e['doc'],
					fecha: new Date(e['fecha']),
					tipoD: e['TipoDoc'],
					tipoP: e['tipoper'],
					descrip: e['descrip'],
					ref: e['ref'],
					inicio:
						e['inicio'] === '1899-11-30T05:08:36.000Z' ? null : e['inicio'],
					fin: e['fin'] === '1899-11-30T05:08:36.000Z' ? null : e['fin'],
					activo: e['activo'],
				})
			})

			return docs
		} catch (error) {
			throw new Error(error as string)
		}
	}
	async create_doc(doc: Doc, range: boolean): Promise<Doc | null> {
		try {
			if (this.check(doc)) throw 'parametros vacios'
			const [result]: Array<any> = await (
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
			const docR: Doc = doc
			docR.docId = result['insertId']
			return docR
		} catch (error) {
			if ((error as QueryError).code === 'ER_NO_REFERENCED_ROW_2')
				throw new Error('Dni no existe')
			if ((error as QueryError).code === 'ER_DUP_ENTRY')
				throw new Error('Documento duplicado')
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
		try {
			if (this.check(pp)) throw 'parametros vacios'
			const [result]: Array<any> = await (
				await MysqlIns.getInstance().MysqlCon
			).execute(
				'INSERT INTO Papeleta(dni,papeleta,descr,detalle,fecha,permiso) values(?,?,?,?,?,?)',
				[pp.dni, pp.pp, pp.descrip, pp.detalle, pp.fecha, pp.permiso]
			)
			const docR: PP = pp
			docR.pid = result['insertId']
			return docR
		} catch (error) {
			if ((error as QueryError).code === 'ER_NO_REFERENCED_ROW_2')
				throw new Error('Dni no existe')
			if ((error as QueryError).code === 'ER_DUP_ENTRY')
				throw new Error('Papeleta duplicado')
			throw new Error('Error desconocido')
		}
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
