export interface ReqUser {
	userId: number;
}

interface Pagination {
	page: number;
	perPage: number;
	categoryId: number;
}

declare global {
	namespace Express {
		interface Request {
			user?: ReqUser;
			pagination?: Pagination;
		}
	}
}
