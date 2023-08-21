import { MysqlService } from "../db/mysql";
import { InformacionAdicional } from "../repository/repos";

export class AdicionalImpl implements InformacionAdicional {
    async buscar_funcionarios(): Promise<object> {
        try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).execute(
				`select
        e.dni,
        e.nombre,
        a.Abrev,
        dt.foto
      from
        Empleado e
        inner join Area a on e.area = a.areaid
        left join DetalleEmpleado dt on dt.dni = e.dni
      where
        e.renuncia = 0
        and e.cargo = 102
        or e.cargo = 104
        and not e.renuncia = 1 order by e.nombre asc`,
			)

			return result
		} catch (error) {
			throw error
		}
    }

}