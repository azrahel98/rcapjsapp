import {
	DocumentosWithDefaults,
	DetalleDocumentosWithDefaults,
	Documentos,
	DetalleDocumentos,
	Empleado,
	EmpleadoWithDefaults,
} from '../models/dbnames'
import { EmpleadoVw } from '../models/model'

export interface EmpleadoRepository {
	create_employ(empleado: EmpleadoWithDefaults): Promise<Empleado | Error>
	editar_employ(empleado: Empleado): Promise<Empleado | Error>
	eliminar_employ(dni: string): Promise<boolean | Error>
	buscar_employ(dni: string): Promise<Empleado | Error>
	buscar_employVw(nombre: string): Promise<EmpleadoVw[] | Error>
}

export interface DocumentosRecibidosRepo {
	crear_doc(
		doc: DocumentosWithDefaults,
		detalle: Array<DetalleDocumentosWithDefaults>
	): Promise<Documentos>
	editar_doc(doc: Documentos, detalle: DetalleDocumentos): Promise<Documentos | Error>
	buscar_doc(nombre: string): Promise<DocumentosWithDefaults | Error>
	buscar_byIdDoc(id: number): Promise<Array<Object> | Error>
	buscar_doc_dni(dni: string): Promise<Array<Object> | Error>
	buscar_doc_byLike(nombre: string): Promise<Array<Object> | Error>
	buscar_doc_detalle(id: number): Promise<Array<Object> | Error>
	eliminar(docid: number): Promise<boolean | Error>
	buscarDocsWithRanges(
		dni: string,
		mes: number,
		year: number
	): Promise<DetalleDocumentos[] | Error>
	buscarDocsWithDate(
		dni: string,
		mes: number,
		year: number
	): Promise<DetalleDocumentos[] | Error>

	anular_doc(docid: number, estado: boolean): Promise<Boolean | Error>
	eliminar_doc(docid: number): Promise<Boolean | Error>
}

export interface AsistenciaRepo {
	buscar_registros(dni: string, mes: number, year: number): Promise<object>
	añadir_asistencia(
		dni: string,
		fecha: string,
		tardanza: number,
		falta: boolean
	): Promise<object>
	buscar_asistencia(dni: string, mes: number, year: number): Promise<object>
	editar_asistencia(): void
	eliminar_asistencia(fecha: Date | string, dni: string): void
}

export interface InformacionAdicional {
	buscar_funcionarios(): Promise<object>
}

export interface LoginRepo {
	login(username: string, password: string): Promise<string>
}
