import moment from 'moment'
import { QueryError } from 'mysql2/promise'
import { MysqlIns } from '../db/mysql'
import { AsistenciaD, AsistenciaTable } from '../models/asiste/asiste'
import { AsisteRepo } from '../repo/asiste'

export class AsistImpl implements AsisteRepo {
	async grupofMonth(grupo: string, mes: number, año: number): Promise<AsistenciaTable[] | null> {
		try {
			const [result]: Array<any> = await MysqlIns.getInstance()
				.MysqlCon.query('select e.nombre, sum(a.tardanza) tardanza,sum(a.falta) falta,month(a.fecha) mes from Asistencia a right join Employ e on a.dni = e.dni where e.grupo = ? and month(a.fecha) = ? and year(a.fecha) = ? GROUP BY e.nombre',
					[grupo, mes, año])
			if (result.length == 0) return null
			return result
		} catch (error) {
			return null
		}
	}

	async add(asis: AsistenciaD): Promise<AsistenciaD | null> {
		try {
			if (!asis.dni) throw 'sin parametros'
			const search = await this.buscarAsistencia(asis.fecha.toString(), asis.dni.toString())
			if (search) return search
			const [result]: Array<any> = await (
				await MysqlIns.getInstance().MysqlCon
			).execute(
				'insert into Asistencia(dni,fecha,tardanza,acuenta,df,detalle,falta) values(?,?,?,?,?,?,?)',
				[
					asis.dni,
					moment(asis.fecha).format('YYYY-MM-DD'),
					asis.tardanza == null ? null : asis.tardanza,
					asis.acuenta == null ? null : asis.acuenta,
					asis.df ? 1 : 0,
					asis.detalle == null ? null : asis.detalle,
					asis.falta ? 1 : 0,
				]
			)
			const asistencia: AsistenciaD = asis
			asistencia.id = result['insertId']
			return asistencia
		} catch (error) {
			if ((error as QueryError).code === 'ER_NO_REFERENCED_ROW_2')
				throw new Error('Dni no existe')
			throw new Error(error as string)
		}
	}
	async edit(asis: AsistenciaD): Promise<AsistenciaD> {
		throw new Error('Method not implemented.')
	}
	async delete(id: number): Promise<number> {
		throw new Error('Method not implemented.')
	}
	async search(dni: string, mes: number, año: number): Promise<AsistenciaD[] | null> {
		try {
			const [result]: Array<any> = await (
				await MysqlIns.getInstance().MysqlCon
			).query(
				`SELECT * FROM Asistencia where dni = ? and month(fecha) = ? and year(fecha) = ?`,
				[dni, mes, año]
			)
			const data: Array<AsistenciaD> = []
			result.forEach((e: any) => {
				data.push(e as AsistenciaD)
			});
			return data
		} catch (error) {
			return null
		}
	}

	async buscarAsistencia(fecha: string, dni: string): Promise<AsistenciaD | null> {
		try {
			const [result]: Array<any> = await (
				MysqlIns.getInstance().MysqlCon
			).query(
				`SELECT * FROM Asistencia where dni = ? and fecha = ?`,
				[dni, fecha]
			)
			if (result.length == 0) return null
			return result[0] as AsistenciaD
		} catch (error) {
			console.log(error)
			return null
		}
	}


}
