import {Request, Response, NextFunction} from 'express';
import ExchangePostsService from '@_services/exchangePostsService';
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@_/utils/customError';
import { ReqUser } from '@_/customTypes/express';
import { PostStatus, PostSort, PostUpdateData } from '@_/customTypes/postType';

// 중고거래 게시판 컨트롤러
class ExchangePostsController {
    // 목록 조회
    static async findPosts(req: Request, res: Response, next: NextFunction) {        
        if (req.paginations === undefined) {
            throw new BadRequestError('입력값이 올바르지 않습니다.');
        }
        const user = req.user as ReqUser | undefined;
        const userId = user ? user.userId : undefined;
        const data = {
            paginations: req.paginations, 
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
        const _userId = user ? user.userId : undefined;
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
                    thumbnailId: foundThumbnail.id,
                    thumbnailUrl: foundThumbnail.url,
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

    // static async updatePost(req: Request, res: Response, next: NextFunction) {
    //     // const obj = {
    //     //     sort: '판매',
    //     //     target: 'male',
    //     //     item: 'top',
    //     //     location: '강남구',
    //     //     title: '제목', 
    //     //     price: 7000,
    //     //     images: [],
    //     //     content: 'as;dghasdfkajsdga',
    //     // }
    //     // 1. const userId = req.user.userId;
    //     // 2. postId 패스파라미터로 받아오기
    //     // 3. postId로 게시글 찾아서 userId 일치하는지 확인 -> 아니면 403 에러, 못 찾았으면 404 에러
    //     // 4-1. postId로 title, content수정 post 테이블
    //     // 4-2. postId로 sort, target, item, location, price 수정 post_exchange_detail 테이블
    //     // 4-3. postId로 images수정
    //     // 5. 성공 시 204 No Content 응답
    // }

    // ReqUser = req.user
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

    // // 게시글 삭제
    // static async deletePost(req: Request, res: Response, next: NextFunction) {
    //     // 1. const userId = req.user.userId;
    //     // 2. postId 패스 파라미터로 받아오기
    //     // 3. postId로 조회 없으면 404, 있는데 userId가 다르면 403
    //     // 4. softdelete 하기
    //     // 5. 204 No Content 응답
    // }
}

export default ExchangePostsController;