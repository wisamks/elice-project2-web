import { ReqUser } from '@_/customTypes/express';
import { PostCreation } from '@_/customTypes/postType';
import PostsService from '@_/services/postsService';
import { Request, Response, NextFunction } from 'express';

class PostsController {
    static async getAllPosts(req: Request, res: Response, next: NextFunction) {

    }
    static async getPost(req: Request, res: Response, next: NextFunction) {
        
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