interface RelojB {
	dni?: string
	nombre?: string
	hora?: string
	reloj?: string
	fecha?: Date
}

interface AsistenciaD {
	dni?: string
	fecha: Date,
	tardanza: number
	acuenta: number | null
	df?: boolean
	detalle?: string
	falta?: boolean
	hoexin?: number
	hoexout?: number | null
	id?: number | null

}
interface AsistenciaTable {
	nombre?: string
	tardanza?: number
	falta?: number
	mes?: number
}

export { RelojB, AsistenciaD, AsistenciaTable }
