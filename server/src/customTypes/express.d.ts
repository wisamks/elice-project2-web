declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}

export interface User {
    name: string;
    email: string;
    nickname?: string;
    phone?: string;
}