export interface User {
	userId: number;
}

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}
