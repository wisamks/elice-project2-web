import { PostCreation } from "@_/customTypes/postType";
import PhotoModel from "@_/models/photoModel";
import PostModel from "@_/models/postModel";
import { InternalServerError } from "@_/utils/customError";

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
}

export default PostsService;