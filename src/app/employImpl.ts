import jwtDecode from 'jwt-decode'
import { MysqlIns } from '../db/mysql'
import { Employ } from '../models/employ/employ'
import { EmployRepository } from '../repo/employ_r'

export class EmployImpl implements EmployRepository {
	async empleadosActivos(): Promise<number | null> {
		try {
			const [rows]: Array<any> = await (
				await MysqlIns.getInstance().MysqlCon
			).query(`select COUNT(*) cantidad  from Employ e where activo = 'Y'`)

			return rows[0]['cantidad']
		} catch (error) {
			throw new Error('error db')
		}
	}
	async buscar_Empleados(
		dni: string,
		activo: boolean
	): Promise<Employ[] | null> {
		try {
			if (typeof dni === 'string' && dni.trim().length === 0)
				throw 'parametros vacios'

			const [rows]: Array<any> = await (
				await MysqlIns.getInstance().MysqlCon
			).query('select * from Detalle_Empleados  where dni = ?', [dni])

			const employs: Array<Employ> = []
			rows.forEach((e: any) => {
				employs.push({
					dni: e['dni'],
					nombre: e['nombre'],
					regimen: e['regimen'],
					area: e['area'],
					cargo: e['cargo'],
					ingreso: new Date(e['ingreso']),
					horario: e['horario'],
				})
			})

			return employs
		} catch (error) {
			throw new Error('error db')
		}
	}
	async buscar_porNombre(
		nombre: string,
		activo: boolean,
		token?: string
	): Promise<Employ[] | null> {
		try {
			if (typeof nombre === 'string' && nombre.trim().length === 0)
				throw 'parametros vacios'
			const decode: any = jwtDecode(token!)
			const areas: any = await (
				await MysqlIns.getInstance().MysqlCon
			).query('select Area  from `User` u where userid = ?', [decode['id']])
			var query = ''

			if (areas[0][0]['Area'] === '*')
				query = `select * from Detalle_Empleados where nombre LIKE "%${nombre}%"`
			else {
				query = `select * from Detalle_Empleados where nombre LIKE "%${nombre}%" and areaid = ? `
			}

			const [rows]: Array<any> = await (
				await MysqlIns.getInstance().MysqlCon
			).query(query, [areas[0][0]['Area']])

			const employs: Array<Employ> = []
			rows.forEach((e: any) => {
				employs.push({
					dni: e['dni'],
					nombre: e['nombre'],
					regimen: e['regimen'],
					area: e['area'],
					cargo: e['cargo'],
					ingreso: new Date(e['ingreso']),
					horario: e['horario'],
				})
			})

			return employs
		} catch (error) {
			throw new Error('error db')
		}
	}
	check(ob: Record<string, any>): boolean {
		return Object.keys(ob).length === 0
	}
}
