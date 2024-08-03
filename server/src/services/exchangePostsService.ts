import { NotFoundError, ForbiddenError, InternalServerError } from "@_/utils/customError";
import PostModel from "@_/models/postModel";
import PhotoModel from "@_/models/photoModel";
import { Filters, PostCreationData, PostUpdateData } from "@_/customTypes/postType";
import FavoriteModel from "@_/models/favoriteModel";
import CommentModel from "@_/models/commentModel";
import { Paginations } from "@_/customTypes/postType";


// 중고거래 게시판 서비스
class ExchangePostsService {
    // 페이지네이션을 진행하여 필요한 게시글들 불러오는 서비스
    static async getPostsCount(categoryId: number) {
        // categoryId를 넣으면 
        // post테이블에 user 테이블과 post_exchange_detail 테이블을 join하고
        // 전체 게시글 수를 세는 함수
        return await PostModel.getPostsCount(categoryId);
    }
    static async getPosts(paginations: Paginations, filters: Filters | undefined) {
        // categoryId, page, perPage를 넣으면 
        // post테이블에 user 테이블과 post_exchange_detail 테이블을 join하고
        // 페이지네이션을 진행하여 게시글 배열을 뱉어주는 함수
        // [
        //     {
        //         postId, categoryId, title, createdAt, updatedAt, 
        //         userId, nickname, userImage, 
        //         status, item, target, location, price
        //     } * perPage개
        // ]
        const foundPosts = await PostModel.getPosts(paginations, filters);
        return foundPosts.map(foundPost => (
            {
                postId: foundPost.id,
                userId: foundPost.user_id,
                nickname: foundPost.nickname,
                userImage: foundPost.user_image,
                title: foundPost.title,
                content: foundPost.content,
                createdAt: foundPost.created_at,
                updateAt: foundPost.updated_at,
                price: foundPost.price,
                location: foundPost.location,
                reserver: foundPost.reserver_id,
                status: foundPost.status,
                target: foundPost.target,
                item: foundPost.item,
                sort: foundPost.sort,                    
            }
        ));
    }
    // 각 게시글 당 댓글 개수를 조회하는 서비스
    static async getCommentsCount(postId: number) {
        // postId를 집어넣으면 comment 테이블에서 댓글을 카운트해서 개수를 뱉어주는 모델 함수
        return await CommentModel.findCountByPostId(postId);
    }
    // 게시글을 조회하는 서비스
    static async getPost(postId: number) {
        const foundPost = await PostModel.findById(postId);
        if (!foundPost) {
            throw new NotFoundError('해당 게시글이 존재하지 않습니다.');
        }
        return foundPost;
    }
    // 사진 테이블에서 is_main을 확인해서 대문 이미지를 찾는 서비스
    static async getMainImage(postId: number) {
        // postId 집어넣으면 photo 테이블에서 is_main 확인해서 true인 사진 하나를 뱉어주는 모델 함수
        const foundMainImage = await PhotoModel.getMainPhotoByPostId(postId);
        if (!foundMainImage) {
            return {
                id: 0,
                url: '',
            };
        }
        return foundMainImage;
    }
    // 게시글의 사진을 찾아오는 서비스
    static async getPhotos(postId: number, count?: number) {
        const foundPhotos = count ? await PhotoModel.getPhotosByPostId(postId, count) : await PhotoModel.getPhotosByPostId(postId);
        return foundPhotos;
    }
    // 게시글의 사진 개수를 찾는 서비스
    static async getPhotosCount(postId: number) {
        return await PhotoModel.getPhotosCount(postId);
    }
    // 게시글 좋아요 개수를 확인하는 서비스
    static async getFavoriteCount(postId: number) {
        return await FavoriteModel.findCountByPostId(postId);
    }
    // 사용자가 좋아요 누른 게시글인지 확인하는 서비스
    static async checkMyFavorite(postId: number, userId: number|undefined) {
        // userId와 postId를 넣으면 favorite 테이블에서 찾아서 해당 정보를 뱉어주는 함수
        if (!userId) {
            return false;
        }
        return await FavoriteModel.findOneByUserId(postId, userId);
    }
    // 중고거래 게시글 생성
    static async createPost(postContent: PostCreationData) {
		const createdPost = await PostModel.createPost(postContent);
		if (!createdPost) {
			throw new InternalServerError('게시글을 생성하는 데 실패했습니다.');
		}
		return createdPost;
    }
	// 게시글 이미지 생성
	static async createImages(postId: number, images: Array<string>) {
		try {
			const createdImages = await PhotoModel.createPhotos(postId, images);
			return;
		} catch(err) {
			throw err;
		}
	}

    // 게시글 수정
    static async updatePost(postId: number, userId: number, updateData: PostUpdateData, newImages?: string[]): Promise<void> {
        // 게시글 존재 유무 판단 및 권한 확인
        const post = await PostModel.findById(postId);
        if (!post) {
            throw new NotFoundError('게시글을 찾을 수 없습니다.');
        }
        if (post.user_id !== userId) {
            throw new ForbiddenError('게시글을 수정할 권한이 없습니다.');
        }

        // 게시글 정보 업데이트
        const updatedPost = await PostModel.updatePost(postId, updateData);
        if (!updatedPost) {
            throw new InternalServerError('게시글 업데이트에 실패했습니다.');
        }

        // 이미지 업데이트(photoModel 사용)
        if (newImages !== undefined) {
            // 기존 이미지 조회
            const existingPhotos = await PhotoModel.getPhotosByPostId(postId);

            // newimage 비어있으면 삭제
            // 기존이랑 비교 후 삭제할 이미지와 추가할 이미지 확인
            if (newImages.length === 0) {
                // 모든 이미지 삭제(photomodel)
                await PhotoModel.deleteByPostId(postId);
            } else {
                // 삭제할 이미지 처리
                for (const photo of existingPhotos) {
                    if (!newImages.includes(photo.url)) {
                        await PhotoModel.deletePhoto(photo.id);
                    }
                }

                // 추가할 이미지 처리
                // existingUrl은 게시글에서 가져온 사진에서 가져온 url 들
                // imgaesToAdd는 새로 추가하는 사진 url
                // photoModel 사용해서 내용 판별 후 이미지 추가
                const existingUrls = existingPhotos.map(photo => photo.url);
                const imagesToAdd = newImages.filter(url => !existingUrls.includes(url));
                if (imagesToAdd.length > 0) {
                    await PhotoModel.createPhotos(postId, imagesToAdd);
                }
            }
        }
    }

    // 게시글 삭제
    static async deletePost(postId: number, userId: number): Promise<void> {
        const post = await PostModel.findById(postId);
        // postId 없으면 
        if (!post) {
          throw new NotFoundError('게시글을 찾을 수 없습니다.');
        }
        // userId 불일치 경우 에러
        if (post.user_id !== userId) {
          throw new ForbiddenError('게시글을 삭제할 권한이 없습니다.');
        }
        // model이용 소프트 델리트 구현
        const deleted = await PostModel.softDeletePost(postId);
        if (!deleted) {
            throw new InternalServerError('게시글 삭제에 실패했습니다.');
        }
        // 댓글
        // 좋아요
        // 사진
        await Promise.all([
            PhotoModel.deleteByPostId(postId),
            FavoriteModel.deleteByPostId(postId),
            CommentModel.deleteByPostId(postId),
        ]);
        return;
      }
}

export default ExchangePostsService;