import { MysqlService } from '../db/mysql'
import {
	DocumentosWithDefaults,
	DetalleDocumentosWithDefaults,
	Documentos,
	DetalleDocumentos,
} from '../models/dbnames'
import { DocumentosRecibidosRepo } from '../repository/repos'
import moment from 'moment'

export class DocumentosImpl implements DocumentosRecibidosRepo {
	async eliminar_doc(docid: number): Promise<Boolean | Error> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).execute(`delete from  DetalleDocumentos where idDetalle = ?`, [docid])
			if (result.length == 0) throw 'sin campos'
			return result
		} catch (error) {
			throw error
		}
	}
	async anular_doc(docid: number, estado: boolean): Promise<Boolean | Error> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).execute(`update DetalleDocumentos set activo = ? where idDetalle = ?`, [
				estado ? 0 : 1,
				docid,
			])
			if (result.length == 0) throw 'sin campos'
			return result
		} catch (error) {
			throw error
		}
	}
	async buscar_doc_dni(dni: string): Promise<Error | Object[]> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).execute(
				`select
			d.docId,
			d.fecha,
			d.tipo,
			d.nombre,
			count(dt.docId) items
		  from
			Documentos d
			inner join DetalleDocumentos dt on d.docId = dt.docId
			WHERE dni = ?
			GROUP by d.docId`,
				[dni]
			)
			if (result.length == 0) throw 'sin campos'
			result[0].fecha = moment(result[0].fecha).format('YYYY-MM-DD')
			return result
		} catch (error) {
			throw error
		}
	}
	async buscar_byIdDoc(id: number): Promise<Error | Object[]> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).execute('select * from Documentos where docId = ?', [id])
			if (result.length == 0) throw 'sin campos'
			result[0].fecha = moment(result[0].fecha).format('YYYY-MM-DD')
			return result
		} catch (error) {
			throw error
		}
	}
	async buscar_doc_detalle(id: number): Promise<Error | Object[]> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).query(
				`select d.idDetalle,e.nombre,d.fecha,d.descripcion,d.asunto,d.inicio,d.fin,d.activo,d.referencia from DetalleDocumentos d inner join Empleado  e on d.dni = e.dni where d.docId = ? order by d.fecha desc`,
				[id]
			)
			if (result.length == 0) throw 'sin campos'
			result.forEach((e: any) => {
				e.fecha = moment(e.fecha).format('YYYY-MM-DD')
			})
			return result
		} catch (error) {
			throw error
		}
	}
	async buscar_doc_byLike(nombre: string): Promise<Error | Array<Object>> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).query(`select
			d.docId,
			d.fecha,
			d.nombre,
			d.tipo,
			count(dt.idDetalle) items
		  from
			Documentos d
			inner join DetalleDocumentos dt on d.docId = dt.docId where d.nombre LIKE '%${nombre}%' GROUP BY
			d.docId`)
			if (result.length == 0) throw 'sin campos'
			result.forEach((e: any) => {
				e.fecha = moment(e.fecha).format('YYYY-MM-DD')
			})
			return result
		} catch (error) {
			throw error
		}
	}
	async buscarDocsWithDate(
		dni: string,
		mes: number,
		year: number
	): Promise<Error | DetalleDocumentos[]> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).execute(
				`		select
							dni,
							docId doc,
							idDetalle det,
							fecha,
							asunto,
							descripcion,
							referencia
						from
							DetalleDocumentos
						where
							dni = ?
							and month(fecha) = ? and year(fecha) = ? and activo = 0`,
				[dni, mes, year]
			)

			result.forEach((e: any) => {
				e.fecha = moment(e.fecha).format('YYYY-MM-DD')
			})

			return result
		} catch (error) {
			throw error
		}
	}
	async buscarDocsWithRanges(
		dni: string,
		mes: number,
		year: number
	): Promise<Error | DetalleDocumentos[]> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).execute(
				`select dni,docId doc,idDetalle det,inicio,fin,asunto,descripcion,referencia 
				from DetalleDocumentos where fin >=  '${year}-${mes}-01' and year(fin) = ? and dni = ? and activo = 0`,
				[year, dni]
			)

			result.forEach((e: any) => {
				e.inicio = moment(e.inicio).format('YYYY-MM-DD')
				e.fin = moment(e.fin).format('YYYY-MM-DD')
			})

			return result
		} catch (error) {
			throw error
		}
	}
	async buscar_doc(nombre: string): Promise<DocumentosWithDefaults | Error> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).execute('select * from Documentos where nombre = ?', [nombre])
			if (result.length == 0) throw 'sin campos'
			result[0].fecha = moment(result[0].fecha).format('YYYY-MM-DD')
			return result[0] as DocumentosWithDefaults
		} catch (error) {
			throw error
		}
	}
	async crear_doc(
		doc: DocumentosWithDefaults,
		detalle: Array<DetalleDocumentosWithDefaults>
	): Promise<Documentos> {
		try {
			var docId: any = null

			if (doc.docId == undefined) {
				const [result] = await (
					await MysqlService.getInstance().MysqlCon
				).execute('insert into Documentos(fecha,tipo,nombre) values(?,?,?)', [
					doc.fecha,
					doc.tipo,
					doc.nombre,
				])
				docId = result['insertId']
			} else {
				console.log('desde aqui')
				docId = doc.docId
			}

			const removeDouplicates = () => {
				return detalle
					.map((x) => JSON.stringify(x))
					.reduce((acc: any, curt: any) => {
						if (!acc.includes(curt)) {
							acc.push(curt)
						}
						return acc
					}, [])
			}

			removeDouplicates()
				.map((x: any) => JSON.parse(x))
				.forEach(async (e: DetalleDocumentosWithDefaults) => {
					await (
						await MysqlService.getInstance().MysqlCon
					).execute(
						'insert into DetalleDocumentos(descripcion,fecha,referencia,asunto,dni,docId,inicio,fin) values(?,?,?,?,?,?,?,?)',
						[
							e.descripcion,
							e.fecha == null ? null : e.fecha,
							e.referencia == undefined ? null : e.referencia,
							e.asunto,
							e.dni,
							parseInt(docId as string),
							e.inicio == undefined ? null : e.inicio,
							e.fin == undefined ? null : e.fin,
						]
					)
				})
			return {
				docId: parseInt(docId),
				fecha: doc.fecha,
				nombre: doc.nombre,
				tipo: doc.tipo,
			}
		} catch (error) {
			throw error
		}
	}
	async editar_doc(
		doc: Documentos,
		detalle: DetalleDocumentos
	): Promise<Error | Documentos> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).execute('update Documentos set fecha = ?, tipo = ?,nombre = ? where docId = ?', [
				doc.fecha,
				doc.tipo,
				doc.nombre,
				doc.docId,
			])

			await (
				await MysqlService.getInstance().MysqlCon
			).execute(
				'insert into set  descripcion = ?,fecha = ? , referencia = ?,asunto = ? ,dni = ? where idDetalle = ?',
				[
					detalle.descripcion,
					detalle.fecha,
					detalle.referencia,
					detalle.asunto,
					detalle.dni,
					detalle.idDetalle,
				]
			)
			return result
		} catch (error) {
			throw error
		}
	}
	async eliminar(_docid: number): Promise<boolean | Error> {
		throw new Error('Method not implemented.')
	}
}
