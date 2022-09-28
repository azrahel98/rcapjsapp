interface Token {
	value: string
	admin?: boolean
}

interface User {
	id?: number
	nombre?: string
	password?: string
	admin?: string
	nickname?: string
}

export { Token, User }
