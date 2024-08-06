import { PostCreation } from "@_/customTypes/postType";
import CommentModel from "@_/models/commentModel";
import FavoriteModel from "@_/models/favoriteModel";
import PhotoModel from "@_/models/photoModel";
import PostModel from "@_/models/postModel";
import { ForbiddenError, InternalServerError, NotFoundError } from "@_/utils/customError";

class PostsService {
    static async getPosts() {}

    static async getPost(postId: number) {
        const foundPost = await PostModel.findNormalById(postId);
        if (!foundPost) {
            throw new NotFoundError('게시글을 찾을 수 없습니다.');
        }
        return foundPost;
    }
    static async getPhotos(postId: number) {
        const foundPhotos = await PhotoModel.getPhotosByPostId(postId);
        return foundPhotos;
    }
    static async getPhotosCount(postId: number) {
        return await PhotoModel.getPhotosCount(postId);
    }
    static async getMainImage(postId: number) {
        const foundMainImage = await PhotoModel.getMainPhotoByPostId(postId);
        if (!foundMainImage) {
            return {
                id: 0,
                url: '',
            };
        }
        return foundMainImage;
    }
    static async getCommentsCount(postId: number) {
        return await CommentModel.findCountByPostId(postId);
    }
    static async getFavoriteCount(postId: number) {
        return await FavoriteModel.findCountByPostId(postId);
    }
    static async checkMyFavorite(postId: number, userId: number|undefined) {
        if (!userId) {
            return false;
        }
        const foundFavorite = await FavoriteModel.findOneByUserId(postId, userId);
        return foundFavorite;
    }

    static async createPost(data: PostCreation, images: Array<string>) {
        const createdPostId = await PostModel.createNormalPost(data);
        if (!createdPostId) {
            throw new InternalServerError('게시글 생성에 실패했습니다.');
        }
        await PhotoModel.createPhotos(createdPostId, images);
        return createdPostId;
    }
    static async updatePost(data: PostCreation, images: Array<string>, postId: number) {
        const foundPost = await PostModel.findNormalById(postId);
        if (!foundPost) {
            throw new NotFoundError('존재하지 않는 게시글입니다.');
        }
        if (foundPost.user_id !== data.user_id) {
            throw new ForbiddenError('잘못된 접근입니다.');
        }
        const updateData = {
            title: foundPost.title !== data.title ? data.title : undefined,
            content: foundPost.content !== data.content ? data.content : undefined,
        }
        await PostModel.updateNormalPost(postId, updateData);
        // 이미지 업데이트(photoModel 사용)
        if (images !== undefined) {
            // 기존 이미지 조회
            const existingPhotos = await PhotoModel.getPhotosByPostId(postId);

            // newimage 비어있으면 삭제
            // 기존이랑 비교 후 삭제할 이미지와 추가할 이미지 확인
            if (images.length === 0) {
                // 모든 이미지 삭제(photomodel)
                await PhotoModel.deleteByPostId(postId);
            } else {
                // 삭제할 이미지 처리
                for (const photo of existingPhotos) {
                    if (!images.includes(photo.url)) {
                        await PhotoModel.deletePhoto(photo.id);
                    }
                }

                // 추가할 이미지 처리
                // existingUrl은 게시글에서 가져온 사진에서 가져온 url 들
                // imgaesToAdd는 새로 추가하는 사진 url
                // photoModel 사용해서 내용 판별 후 이미지 추가
                const existingUrls = existingPhotos.map(photo => photo.url);
                const imagesToAdd = images.filter(url => !existingUrls.includes(url));
                if (imagesToAdd.length > 0) {
                    await PhotoModel.createPhotos(postId, imagesToAdd);
                }
            }
        }
        return;
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