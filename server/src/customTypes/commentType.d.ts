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

export interface UpdateComment{
    content?: string;
    secret?: boolean;
}

export interface Comment {
    commentId: number;
    postId: number;
    userId: number;
    content: string;
    secret: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}