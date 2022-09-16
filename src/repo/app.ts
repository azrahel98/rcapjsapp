import { Token } from '../models/user/user'

export interface LoginInterface {
	login(username: string, password: string): Promise<Token | null>
}
