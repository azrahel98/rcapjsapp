import { AsistenciaD } from '../models/asiste/asiste'

interface AsisteRepo {
    add(asis: AsistenciaD): Promise<AsistenciaD | null>
    edit(asis: AsistenciaD): Promise<AsistenciaD>
    delete(id: number): Promise<number>
    search(dni: string, mes: number, año: number): Promise<AsistenciaD[] | null>
}

export { AsisteRepo }