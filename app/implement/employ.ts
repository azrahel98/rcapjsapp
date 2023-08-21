import { MysqlService } from '../db/mysql'
import { EmpleadoWithDefaults, Empleado } from '../models/dbnames'
import { EmpleadoVw } from '../models/model'
import { EmpleadoRepository } from '../repository/repos'

export class EmployImp implements EmpleadoRepository {
	async buscar_employVw(nombre: string): Promise<EmpleadoVw[] | Error> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).query(
				`SELECT e.dni ,e.nombre ,e.ingreso,a.nombre area,c.nombre cargo,e.renuncia activo from Empleado e left join Area a ON e.area = a.areaid left join Cargo c on c.cargoid = e.cargo where e.nombre  LIKE '%${nombre}%'`
			)
			return result as Array<EmpleadoVw>
		} catch (error) {
			throw error
		}
	}
	async create_employ(empleado: EmpleadoWithDefaults): Promise<Empleado | Error> {
		try {
			if (empleado.dni.length < 8) throw new Error('formato invalido para el dni')
			await (
				await MysqlService.getInstance().MysqlCon
			).execute('insert into Empleado values(?,?,?,?,?,?,?,?,?)', [
				empleado.dni,
				empleado.nombre,
				empleado.area,
				empleado.regimen,
				empleado.ingreso,
				empleado.renuncia,
				empleado.salida,
				empleado.sueldo,
				empleado.cargo,
			])
			return {
				...empleado,
			}
		} catch (error) {
			throw error
		}
	}
	async editar_employ(empleado: Empleado): Promise<Empleado | Error> {
		try {
			if (empleado.dni.length < 8) throw new Error('formato invalido para el dni')
			await (
				await MysqlService.getInstance().MysqlCon
			).execute(
				'update Empleado set nombre = ?, area = ?, regimen = ?, ingreso=?,renuncia = ?,salida =?,sueldo = ?,cargo =?',
				[
					empleado.nombre,
					empleado.area,
					empleado.regimen,
					empleado.ingreso,
					empleado.renuncia,
					empleado.salida,
					empleado.sueldo,
					empleado.cargo,
				]
			)
			return {
				...empleado,
			}
		} catch (error) {
			throw error
		}
	}
	async eliminar_employ(dni: string): Promise<boolean | Error> {
		try {
			await (
				await MysqlService.getInstance().MysqlCon
			).execute('delete from Empleado where dni = ? ', [dni])
			return true
		} catch (error) {
			throw error
		}
	}
	async buscar_employ(dni: string): Promise<Empleado | Error> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).query(
				`select
			e.dni,
			e.nombre,
			a.nombre area,
			e.regimen,
			e.ingreso,
			e.renuncia,
			e.salida,
			e.sueldo,
			c.nombre cargo
		  from
			Empleado e
			inner join Area a on e.area = a.areaid
			inner join Cargo c on e.cargo = c.cargoid
			where e.dni = ?`,
				[dni]
			)

			if (result.length == 0) {
				throw new Error('no existe')
			}
			return result
		} catch (error) {
			throw error
		}
	}
}
