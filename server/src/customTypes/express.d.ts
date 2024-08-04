import { Filters, Paginations } from "./postType";

export interface ReqUser {
	userId: number;
}

declare global {
	namespace Express {
		interface Request {
			user?: ReqUser;
			paginations?: Paginations;
			filters?: Filters;
		}
	}
}
