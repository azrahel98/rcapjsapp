interface Doc {
	docId?: number
	dni?: string
	docName?: string
	fecha?: Date
	tipoD?: DocTipe
	tipoP?: TipoPer
	descrip?: string
	ref?: string
	inicio?: Date | null
	fin?: Date | null
	activo?: boolean
}

enum DocTipe {
	RESOLUCION,
	CARTA,
	INFORME,
	RENUNCIA,
	SOLICITUD,
	MEMORANDO,
	ADELANTO,
}

enum TipoPer {
	DF,
	AC,
	JUSTIFICADO,
	XHEL,
	ONOMASTICO,
	ADELANTO,
	SANSION,
	LICENCIA,
	HORASEXTRAS,
	OMISION,
	OTROS,
}

export { Doc }
