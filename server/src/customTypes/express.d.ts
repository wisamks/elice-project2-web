declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}

export interface User {
    userId: number;
}