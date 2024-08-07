import {Request, Response, NextFunction} from 'express';
import ExchangePostsService from '@_services/exchangePostsService';
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@_/utils/customError';
import { ReqUser } from '@_/customTypes/express';
import { PostStatus, PostSort, PostUpdateData, Paginations } from '@_/customTypes/postType';
import ExchangeGetDTO from '@_/middlewares/DTOs/exchangeGetDTO';
import PostGetOneDTO from '@_/middlewares/DTOs/postGetOneDTO';
import ExchangeCreateDTO from '@_/middlewares/DTOs/exchangeCreateDTO';
import ExchangeUpdateDTO from '@_/middlewares/DTOs/exchangeUpdateDTO';
import ExchangeStatusDTO from '@_/middlewares/DTOs/exchangeStatusDTO';

// 중고거래 게시판 컨트롤러
class ExchangePostsController {
    // 목록 조회
    static async findPosts(req: Request, res: Response, next: NextFunction) {        
        const data: ExchangeGetDTO = req.body;
        try {
            const totalPostsCount = await ExchangePostsService.getPostsCount(data);
            const foundPosts = await ExchangePostsService.getPosts(data);
            return res.status(200).json({
                totalPostsCount,
                posts: foundPosts,
            });
        } catch(err) {
            return next(err);
        }
    }
    // 게시글 조회
    static async findOnePost(req: Request, res: Response, next: NextFunction) {
        // 댓글은 따로 클라이언트에게 api조회 시키기
        const { postId, userId }: PostGetOneDTO = req.body;
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
                ExchangePostsService.getPost(postId),
                ExchangePostsService.getPhotos(postId),
                ExchangePostsService.getPhotosCount(postId),
                ExchangePostsService.getMainImage(postId),
                ExchangePostsService.getCommentsCount(postId),
                ExchangePostsService.getFavoriteCount(postId),
                ExchangePostsService.checkMyFavorite(postId, userId),
                ExchangePostsService.findViews(postId, userId)
            ]);
            const foundFilteredPosts = await ExchangePostsService.getPosts({
                page: 1,
                perPage: 8,
                categoryId: 1,
                sort: foundPost.sort,
                target: foundPost.target,
                item: foundPost.item,
                location: foundPost.location,
                price: foundPost.price,
                postId: postId,
                userId: postId,
            });
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
                    price: foundPost.price,
                    location: foundPost.location,
                    reserver: foundPost.reserver_id,
                    status: foundPost.status,
                    target: foundPost.target,
                    item: foundPost.item,
                    sort: foundPost.sort,                    
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
                filteredPosts: foundFilteredPosts,
            });
        } catch(err) {
            return next(err);
        }     
    }
    // 게시글 생성
    static async createPost(req: Request, res: Response, next: NextFunction) {
        // sort에 따라 activityId 조회 -> 포인트 구현 시
        const data: ExchangeCreateDTO = req.body;
        try {
            const createdPost = await ExchangePostsService.createPost(data);
            const postId = createdPost.id;
            await ExchangePostsService.createImages(postId, data.images);
            return res.status(201).json({postId});
        } catch(err) {
            return next(err);
        }
        
    }


    // 게시글 수정
    static async updatePost(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ExchangeUpdateDTO = req.body;
            await ExchangePostsService.updatePost(data);    
            return res.status(204).end();
        } catch (error) {
            return next(error);
        }
    }

    // 게시글 삭제
    static async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
          const { postId, userId }: PostGetOneDTO = req.body;        // 타입에러 떠서 가이드 대로 변경 - 미들웨어에서 postId 검증 완료
          // model -> service 이용해서 게시글 삭제(비즈니스로직은 서비스로..분리)
          await ExchangePostsService.deletePost(postId, userId);
    
          return res.status(204).end();
        } catch (error) {
          return next(error);
        }
      }

    // 게시글 상태 수정
    static async updatePostStatus(req: Request, res: Response, next: NextFunction) {
        const {postId, userId, status}: ExchangeStatusDTO = req.body;
        try {
            await ExchangePostsService.updatePostStatus(status, Number(postId), userId);
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
}

export default ExchangePostsController;