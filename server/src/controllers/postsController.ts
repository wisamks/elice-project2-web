import { ReqUser } from '@_/customTypes/express';
import { Paginations, PostCreation } from '@_/customTypes/postType';
import PostCreateDTO from '@_/middlewares/DTOs/postCreateDTO';
import PostGetDTO from '@_/middlewares/DTOs/postGetDTO';
import PostGetOneDTO from '@_/middlewares/DTOs/postGetOneDTO';
import PostUpdateDTO from '@_/middlewares/DTOs/postUpdateDTO';
import PostsService from '@_/services/postsService';
import { Request, Response, NextFunction } from 'express';

class PostsController {
    static async getAllPosts(req: Request, res: Response, next: NextFunction) {
        const data: PostGetDTO = req.body;
        try {
            const [totalPostsCount, foundPosts] = await Promise.all([
                PostsService.getPostsCount(data),
                PostsService.getPosts(data),
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
        const {postId, userId}: PostGetOneDTO = req.body;
        try {
            const [
                foundPost,
                foundPhotos,
                foundPhotosCount,
                foundThumbnail,
                foundCommentsCount,
                foundFavoriteCount,
                isMyFavorite,
                foundViews,
            ] = await Promise.all([
                PostsService.getPost(postId),
                PostsService.getPhotos(postId),
                PostsService.getPhotosCount(postId),
                PostsService.getMainImage(postId),
                PostsService.getCommentsCount(postId),
                PostsService.getFavoriteCount(postId),
                PostsService.checkMyFavorite(postId, userId),
                PostsService.findViews(postId, userId)
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
                    createdAt: new Date(foundPost.created_at).toISOString().replace('Z', '+09:00'),
                    updateAt: new Date(foundPost.updated_at).toISOString().replace('Z', '+09:00'),
                },
                images: foundPhotos.map(image => ({
                    imageId: image.id,
                    url: image.url,
                })),
                counts: {
                    imagesCount: foundPhotosCount,
                    commentsCount: foundCommentsCount,
                    favoriteCount: foundFavoriteCount,
                    viewsCount: foundViews,
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
        const data: PostCreateDTO = req.body;
        try {
            const createdPostId = await PostsService.createPost(data);
            return res.status(201).json({postId: createdPostId});
        } catch(err) {
            return next(err);
        }
    }
    static async updatePost(req: Request, res: Response, next: NextFunction) {
        const data: PostUpdateDTO = req.body;
        try {
            const updatedPost = await PostsService.updatePost(data);
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
    static async deletePost(req: Request, res: Response, next: NextFunction) {
        const {postId, userId}: PostGetOneDTO = req.body;
        try {
            await PostsService.deletePost(Number(postId), userId);
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
}

export default PostsController;