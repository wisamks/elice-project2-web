export interface CreationComment {
    postId: number;
    content: string;
    secret: boolean;
    userId: number;
};

export interface PaginationComment {
    postId: number;
    page: number;
    perPage: number;
}