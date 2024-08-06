import { ReqUser } from '@_/customTypes/express';
import { Paginations, PostCreation } from '@_/customTypes/postType';
import PostsService from '@_/services/postsService';
import { Request, Response, NextFunction } from 'express';

class PostsController {
    static async getAllPosts(req: Request, res: Response, next: NextFunction) {
        const { categoryId, page, perPage } = req.query;
        const user = req.user as ReqUser;
        const userId = user?.userId;
        const data: Paginations = {
            categoryId: Number(categoryId),
            page: page ? Number(page) : 1,
            perPage: perPage ? Number(perPage) : 40,
        };
        try {
            const [totalPostsCount, foundPosts] = await Promise.all([
                PostsService.getPostsCount(data),
                PostsService.getPosts(data, userId),
            ]);
            return res.status(200).json({
                totalPostsCount,
                posts: foundPosts,
            });
        } catch(err) {
            return next(err);
        }
    }
    static async getPost(req: Request, res: Response, next: NextFunction) {
        const { postId } = req.params;
        const user = req.user as ReqUser|undefined;
        const userId = user?.userId;
        const _postId = Number(postId);
        try {
            const [
                foundPost,
                foundPhotos,
                foundPhotosCount,
                foundThumbnail,
                foundCommentsCount,
                foundFavoriteCount,
                isMyFavorite,
            ] = await Promise.all([
                PostsService.getPost(_postId),
                PostsService.getPhotos(_postId),
                PostsService.getPhotosCount(_postId),
                PostsService.getMainImage(_postId),
                PostsService.getCommentsCount(_postId),
                PostsService.getFavoriteCount(_postId),
                PostsService.checkMyFavorite(_postId, userId),
            ]);
            return res.status(200).json({
                post: {
                    postId: foundPost.id,
                    categoryId: foundPost.category_id,
                    userId: foundPost.user_id,
                    nickname: foundPost.nickname,
                    userImage: foundPost.user_image,
                    title: foundPost.title,
                    content: foundPost.content,
                    createdAt: foundPost.created_at,
                    updateAt: foundPost.updated_at,
                },
                images: foundPhotos.map(image => ({
                    imageId: image.id,
                    url: image.url,
                })),
                counts: {
                    imagesCount: foundPhotosCount,
                    commentsCount: foundCommentsCount,
                    favoriteCount: foundFavoriteCount,
                },
                thumbnail: {
                    thumbnailId: foundPhotos[0]?.id,
                    thumbnailUrl: foundPhotos[0]?.url,
                },
                isMyFavorite: !!isMyFavorite,
            });
        } catch(err) {
            return next(err);
        }
    }
    static async createPost(req: Request, res: Response, next: NextFunction) {
        const { categoryId, title, images, content } = req.body;
        const user = req.user as ReqUser;
        const userId = user.userId;
        
        const data: PostCreation = { title, content, category_id: Number(categoryId), user_id: userId }
        try {
            const createdPostId = await PostsService.createPost(data, images);
            return res.status(201).json({postId: createdPostId});
        } catch(err) {
            return next(err);
        }
    }
    static async updatePost(req: Request, res: Response, next: NextFunction) {
        const { categoryId, title, images, content } = req.body;
        const { postId } = req.params;
        const user = req.user as ReqUser;
        const userId = user.userId;

        const data: PostCreation = { title, content, category_id: Number(categoryId), user_id: userId };
        try {
            const updatedPost = await PostsService.updatePost(data, images, Number(postId));
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
    static async deletePost(req: Request, res: Response, next: NextFunction) {
        const { postId } = req.params;
        const user = req.user as ReqUser;
        const userId = user.userId;
        try {
            await PostsService.deletePost(Number(postId), userId);
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
}

export default PostsController;