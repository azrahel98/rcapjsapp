interface PP {
	pid?: number
	dni?: string
	pp?: string
	descrip?: string
	detalle?: string
	fecha?: Date
	permiso?: Permiso
}

enum Permiso {
	DF,
	AC,
	JUSTIFICADO,
	XHEL,
	ONOMASTICO,
	OMISION,
}

export { PP }
