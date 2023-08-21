import moment from 'moment'
import { MysqlService } from '../db/mysql'
import { AsistenciaRepo } from '../repository/repos'

export class AsistenciaImpl implements AsistenciaRepo {
	async eliminar_asistencia(fecha: string | Date, dni: string): Promise<void> {
		try {
			const [_result] = await (
				await MysqlService.getInstance().MysqlCon
			).query(`delete from Asistencia where dni = ? and fecha = ?`, [dni, fecha])
		} catch (error) {
			throw error
		}
	}
	async buscar_asistencia(dni: string, mes: number, year: number): Promise<object> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).query(
				`select * from Asistencia where dni = ? and month(fecha) = ? and year(fecha) = ?`,
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
	async añadir_asistencia(
		dni: string,
		fecha: string,
		tardanza: number,
		falta: boolean
	): Promise<Object> {
		try {
			const [_result] = await (
				await MysqlService.getInstance().MysqlCon
			).execute('insert into Asistencia(tardanza,falta,fecha,dni) values(?,?,?,?)', [
				tardanza,
				falta ? 1 : 0,
				fecha,
				dni,
			])

			return {
				tardanza,
				falta,
				fecha,
				dni,
			}
		} catch (error) {
			throw error
		}
	}
	async buscar_registros(dni: string, mes: number, year: number): Promise<object> {
		try {
			const [result] = await (
				await MysqlService.getInstance().MysqlCon
			).query(
				`select
        dni,
        TIME(SUBSTRING_INDEX(hora, ',', 1)) AS entrada,
        case
          when TIMEDIFF(
            TIME(SUBSTRING_INDEX(SUBSTRING_INDEX(hora, ',', 4), ',', -1)),
            TIME(
              SUBSTRING_INDEX(SUBSTRING_INDEX(hora, ',', 2), ',', -1)
            )
          ) = TIME('00:00') then NULL
          else TIME(
            SUBSTRING_INDEX(SUBSTRING_INDEX(hora, ',', 2), ',', -1)
          )
        end as entrada2,
        case
          when TIMEDIFF(
            TIME(SUBSTRING_INDEX(hora, ',', 1)),
            TIME(
              SUBSTRING_INDEX(SUBSTRING_INDEX(hora, ',', 4), ',', -1)
            )
          ) = TIME('00:00') then NULL
          else TIME(
            SUBSTRING_INDEX(SUBSTRING_INDEX(hora, ',', 4), ',', -1)
          )
        end as salida,
        case
          when TIMEDIFF(
            TIME(SUBSTRING_INDEX(hora, ',', 1)),
            tIME("08:15")
          ) < TIME("00:00") then NULL
          else TIMEDIFF(
            TIME(SUBSTRING_INDEX(hora, ',', 1)),
            tIME("08:15")
          )
        end as tardanza,
        date
      from
        (
          select
            r.dni,
            GROUP_concat(
              r.hora
              ORDER by
                r.hora asc
            ) as hora,
            r.date
          from
            Registros r
          where
            r.dni = ?
            and month(r.date) = ?
            and year(r.date) = ?
          GROUP BY
            r.date
          ORDER BY
            r.date asc
        ) as registros`,
				[dni, mes, year]
			)

			result.forEach((e: any) => {
				e.date = moment(e.date).format('YYYY-MM-DD')
			})
			return result
		} catch (error) {
			throw error
		}
	}

	editar_asistencia(): void {
		throw new Error('Method not implemented.')
	}
}
