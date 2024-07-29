import { User } from '../models/user';

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}

interface User {
    name: string;
    email: string;
    nickname?: string;
    phone?: string;
}