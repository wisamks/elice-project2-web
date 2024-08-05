import { PostCreation } from "@_/customTypes/postType";
import CommentModel from "@_/models/commentModel";
import FavoriteModel from "@_/models/favoriteModel";
import PhotoModel from "@_/models/photoModel";
import PostModel from "@_/models/postModel";
import { ForbiddenError, InternalServerError, NotFoundError } from "@_/utils/customError";

class PostsService {
    static async getPosts() {}
    static async createPost(data: PostCreation, images: Array<string>) {
        const createdPostId = await PostModel.createNormalPost(data);
        if (!createdPostId) {
            throw new InternalServerError('게시글 생성에 실패했습니다.');
        }
        await PhotoModel.createPhotos(createdPostId, images);
        return createdPostId;
    }
    static async deletePost(postId: number, userId: number) {
        const foundPost = await PostModel.findNormalById(postId);
        if (!foundPost) {
            throw new NotFoundError('존재하지 않는 게시글입니다.');
        }
        if (foundPost.user_id !== userId) {
            throw new ForbiddenError('잘못된 접근입니다.');
        }
        await Promise.all([
            PostModel.softDeletePost(postId),
            CommentModel.deleteByPostId(postId),
            PhotoModel.deleteByPostId(postId),
            FavoriteModel.deleteByPostId(postId),
        ]);
        return;
    }
}

export default PostsService;