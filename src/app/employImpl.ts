import { MysqlIns } from '../db/mysql'
import { Employ } from '../models/employ/employ'
import { EmployRepository } from '../repo/employ_r'

export class EmployImpl implements EmployRepository {
	buscar_Empleados(dni: string, activo: boolean): Promise<Employ[] | null> {
		throw new Error('Method not implemented.')
	}
	async buscar_porNombre(
		nombre: string,
		activo: boolean
	): Promise<Employ[] | null> {
		try {
			if (typeof nombre === 'string' && nombre.trim().length === 0)
				throw 'parametros vacios'

			const [rows]: Array<any> = await (
				await MysqlIns.getInstance().MysqlCon
			).query(`select * from Detalle_Empleados where nombre LIKE "${nombre}%"`)

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
