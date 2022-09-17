import { Doc } from '../models/doc/doc'
import { PP } from '../models/doc/pp'

interface DocRepository {
	// documentos
	create_doc(doc: Doc, range: boolean): Promise<Doc | null>
	edit_doc(doc: Doc): Promise<Doc>
	delete_doc(docId: number): Promise<number>
	//papeletas
	create_pp(pp: PP): Promise<Doc>
	edit_pp(pp: PP): Promise<Doc>
	delete_pp(ppId: number): Promise<number>
}

export { DocRepository }
