/**
 Schema Generated with mysql-schema-ts 1.9.0
*/

/**
 * Exposes all fields present in Area as a typescript
 * interface.
 */
export interface Area {
	areaid: number
	nombre: string
	anexo: string
	ruta: string
}

/**
 * Exposes the same fields as Area,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface AreaWithDefaults {
	areaid?: number
	nombre: string
	anexo: string
	ruta: string
}
/**
 * Exposes all fields present in Asistencia as a typescript
 * interface.
 */
export interface Asistencia {
	id: number
	tardanza: number
	/**  Defaults to: NULL. */
	falta?: number | null
	fecha: Date
	dni: string
}

/**
 * Exposes the same fields as Asistencia,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface AsistenciaWithDefaults {
	id?: number
	tardanza: number
	/**  Defaults to: NULL. */
	falta?: number | null
	fecha: Date
	dni: string
}
/**
 * Exposes all fields present in Cargo as a typescript
 * interface.
 */
export interface Cargo {
	cargoid: number
	nombre: string
}

/**
 * Exposes the same fields as Cargo,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface CargoWithDefaults {
	cargoid?: number
	nombre: string
}
/**
 * Exposes all fields present in DetalleDocumentos as a typescript
 * interface.
 *
 */

export enum PermisosActivos {
	'DF',
	'HORASEXTRAS',
	'ONOMASTICO',
	'JUSTIFICADO',
	'OMISION',
	'LICENCIA',
	'SANCION',
	'DFXHEL',
	'OTROS',
	'AC',
	'DM',
	'RENUNCIA',
}

export interface DetalleDocumentos {
	docId: number
	descripcion: string
	fecha: Date
	referencia: string
	asunto: PermisosActivos
	dni: string
	idDetalle: number
	inicio?: Date | string | null
	fin?: Date | string | null
}

/**
 * Exposes the same fields as DetalleDocumentos,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DetalleDocumentosWithDefaults {
	docId: number
	descripcion: string
	fecha: Date
	referencia?: string | null
	asunto?: PermisosActivos | null | string
	dni: string
	idDetalle?: number | null
	inicio?: Date | string | null
	fin?: Date | string | null
}
/**
 * Exposes all fields present in DetalleEmpleado as a typescript
 * interface.
 */
export interface DetalleEmpleado {
	dni: string
	/**  Defaults to: NULL. */
	telefono?: string | null
	/**  Defaults to: NULL. */
	direccion?: string | null
	/**  Defaults to: NULL. */
	correo?: string | null
}

/**
 * Exposes the same fields as DetalleEmpleado,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DetalleEmpleadoWithDefaults {
	dni: string
	/**  Defaults to: NULL. */
	telefono?: string | null
	/**  Defaults to: NULL. */
	direccion?: string | null
	/**  Defaults to: NULL. */
	correo?: string | null
}
/**
 * Exposes all fields present in Documentos as a typescript
 * interface.
 */
export interface Documentos {
	docId: number
	fecha: Date
	tipo: TipoDocumento
	nombre: string
}

export enum TipoDocumento {
	'DOC-ADM',
	'MEMORANDO',
	'SOLICITUD',
	'DESCANSO MEDICO',
	'INFORME',
	'RESOLUCION',
	'CARTA',
	'OFICIO',
	'PAPELETA',
	'RENUNCIA'
	
	
}

/**
 * Exposes the same fields as Documentos,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DocumentosWithDefaults {
	docId?: number
	fecha: Date
	tipo: TipoDocumento
	nombre: string
}
/**
 * Exposes all fields present in Empleado as a typescript
 * interface.
 */

export enum RegimenesActivos {
	'276-PERMANENTE',
	'276-EMPLEADO',
	'276-OBRERO',
	'728-OBRERO',
	'CAS-57',
	'CAS-83',
	'CAS-RE',
	'CAS-F',
}

export interface Empleado {
	dni: string
	nombre: string
	area: number | string 
	regimen: RegimenesActivos
	/**  Defaults to: NULL. */
	ingreso?: Date | null
	/**  Defaults to: NULL. */
	renuncia?: number | null
	/**  Defaults to: NULL. */
	salida?: Date | null
	/**  Defaults to: NULL. */
	sueldo?: number | null
	cargo: number | string
}

/**
 * Exposes the same fields as Empleado,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface EmpleadoWithDefaults {
	dni: string
	nombre: string
	area: number
	regimen: RegimenesActivos
	/**  Defaults to: NULL. */
	ingreso?: Date | null
	/**  Defaults to: NULL. */
	renuncia?: number | null
	/**  Defaults to: NULL. */
	salida?: Date | null
	/**  Defaults to: NULL. */
	sueldo?: number | null
	cargo: number
}
/**
 * Exposes all fields present in Registros as a typescript
 * interface.
 */
export interface Registros {
	dni: string
	hora: string
	date: Date
}

/**
 * Exposes the same fields as Registros,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface RegistrosWithDefaults {
	dni: string
	hora: string
	date: Date
}
/**
 * Exposes all fields present in usuario as a typescript
 * interface.
 */
export interface Usuario {
	id: number
	username: string
	password: string
	/**  Defaults to: 0. */
	admin: number
}

/**
 * Exposes the same fields as Usuario,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface UsuarioWithDefaults {
	id?: number
	username: string
	password: string
	/**  Defaults to: 0. */
	admin?: number
}
