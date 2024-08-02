export interface User {
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
			user?: User;
			pagination?: Pagination;
		}
	}
}
