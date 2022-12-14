import { Employ } from '../models/employ/employ'

interface EmployRepository {
	buscar_Empleados(dni: string, activo: boolean): Promise<Employ[] | null>
	buscar_porNombre(
		nombre: string,
		activo: boolean,
		token: string
	): Promise<Employ[] | null>

	empleadosActivos(): Promise<number | null>
}

export { EmployRepository }
