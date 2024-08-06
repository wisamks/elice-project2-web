import {Request, Response, NextFunction} from 'express';
import ExchangePostsService from '@_services/exchangePostsService';
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@_/utils/customError';
import { ReqUser } from '@_/customTypes/express';
import { PostStatus, PostSort, PostUpdateData, Paginations } from '@_/customTypes/postType';

// 중고거래 게시판 컨트롤러
class ExchangePostsController {
    // 목록 조회
    static async findPosts(req: Request, res: Response, next: NextFunction) {        
        const user = req.user as ReqUser | undefined;
        const userId = user ? user.userId : undefined;
        const data = {
            paginations: req.paginations as Paginations, 
            filters: req.filters, 
            postId: undefined, 
            userId,
        };
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
        const { postId } = req.params;
        const _postId = +postId;
        const user = req.user as ReqUser | undefined;
        const _userId = user?.userId;
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
                ExchangePostsService.getPost(_postId),
                ExchangePostsService.getPhotos(_postId),
                ExchangePostsService.getPhotosCount(_postId),
                ExchangePostsService.getMainImage(_postId),
                ExchangePostsService.getCommentsCount(_postId),
                ExchangePostsService.getFavoriteCount(_postId),
                ExchangePostsService.checkMyFavorite(_postId, _userId),
            ]);
            const paginations = {
                page: 1,
                perPage: 8,
                categoryId: 1,
            };
            const filters = {
                sort: foundPost.sort,
                target: foundPost.target,
                item: foundPost.item,
                location: foundPost.location,
                price: foundPost.price,
            };
            const foundFilteredPosts = await ExchangePostsService.getPosts({
                paginations,
                filters,
                postId: _postId,
                userId: _userId,
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
        const currUser = req.user as ReqUser;
        const userId = currUser.userId;
        const {sort, target, item, location, title, price, images, content} = req.body;
        const category_id = 1;
        const status = '진행' as PostStatus;
        const postContent = {user_id: userId, sort, category_id, title, content, status, item, target, location, price: +price};
        try {
            const createdPost = await ExchangePostsService.createPost(postContent);
            const postId = createdPost.id;
            await ExchangePostsService.createImages(postId, images);
            return res.status(201).json({postId});
        } catch(err) {
            return next(err);
        }
        
    }


    // 게시글 수정
    static async updatePost(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as ReqUser;
            const postId = req.params.postId;
            const { sort, target, item, location, title, price, images, content, status } = req.body;

            const updateData: PostUpdateData = {
                sort: sort as PostSort,
                target,
                item,
                location,
                title,
                price: price !== undefined ? +price : undefined,
                content,
                status: status as PostStatus
            };

            await ExchangePostsService.updatePost(+postId, user.userId, updateData, images);
    
            return res.status(204).end();
        } catch (error) {
            return next(error);
        }
    }

    // 게시글 삭제
    static async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
          const user = req.user as ReqUser;
          const postId = req.params.postId;        // 타입에러 떠서 가이드 대로 변경 - 미들웨어에서 postId 검증 완료
          // model -> service 이용해서 게시글 삭제(비즈니스로직은 서비스로..분리)
          await ExchangePostsService.deletePost(+postId, user.userId);
    
          return res.status(204).end();
        } catch (error) {
          return next(error);
        }
      }

    // 게시글 상태 수정
    static async updatePostStatus(req: Request, res: Response, next: NextFunction) {
        const { postId, status } = req.body;
        const user = req.user as ReqUser;
        const userId = user.userId;
        try {
            await ExchangePostsService.updatePostStatus(status, Number(postId), userId);
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
}

export default ExchangePostsController;