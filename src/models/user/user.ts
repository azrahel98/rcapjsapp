interface Token {
	value: string
	admin?: boolean
}

interface User {
	nombre?: string
	password?: string
	admin?: string
	nickname?: string
}

export { Token, User }
