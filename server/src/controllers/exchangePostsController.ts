import {Request, Response, NextFunction} from 'express';

import ExchangePostsService from '@_services/exchangePostsService';
import { BadRequestError } from '@_/utils/customError';

// 중고거래 게시판 컨트롤러
class ExchangePostsController {
    // 목록 조회
    static async findPosts(req: Request, res: Response, next: NextFunction) {
        // 이후 필터 관련 변수들 추가되면 미들웨어 이용해서 추가하기
        
        // 1. 페이지네이션을 진행하여 필요한 게시글들 불러오는 서비스
        if (req.pagination === undefined) {
            throw new BadRequestError('입력값이 올바르지 않습니다.');
        }
        const {page, perPage, categoryId} = req.pagination;
        const totalPostsCount = ExchangePostsService.getPostsCount(categoryId);
        const foundPosts = ExchangePostsService.getPosts(categoryId, page, perPage);
        // 2. 각 게시글 당 댓글 개수를 조회하는 서비스
        // const commentsCountedPosts = ExchangePostsService.getCommentsCount();
        // 3. 사진 테이블에서 is_main을 확인해서 대문 이미지를 찾는 서비스
        // const imageFoundPosts = ExchangePostsService.getMainImage()
        // 4. 사용자가 좋아요 누른 게시글인지 확인하는 서비스
    }
    // 게시글 조회
    static async findOnePost(req: Request, res: Response, next: NextFunction) {
        // 클라에서 받아오는 정보
        // postId path로 받아오기
        // 1. 사진 3개 리밋, 총 개수
        // 2. 게시글 하나 정보 목록에서 얻는 거 + 좋아요 수 + 상세 설명
        // 3. 비슷한 상품 조회 목록 조회 filter 걸어서 limit 8개
        // 4. 댓글 조회 따로 api 호출
    }
    // 게시글 생성
    static async createPost(req: Request, res: Response, next: NextFunction) {
        // body 입력값 예시
        // const obj = {
        //     sort: 'sale',
        //     target: 'male',
        //     item: 'top',
        //     location: '강남구',
        //     title: '제목', 
        //     price: 7000,
        //     images: [],
        //     content: 'as;dghasdfkajsdga',
        // }
        // 1. const userId = req.user.userId; 
        // 2-1. sort에 따라 activityId 조회
        // 2-2. categoryId 는 '중고거래'로 조회? 굳이 필요한가?
        // 3. title, content, userId, activityId(있다면), categoryId를 이용해서 1차적으로 post에 넣기
        // 4-1. 생성된 postId를 이용해서 sort, target, item, location, price, status='진행'을 post_exchange_detail에 집어넣기
        // 4-2. 생성된 postId를 이용해서 이미지는 이미지 생성 서비스에서 이미지 생성 model로 넘기고 promise.all로 한 번에 처리하기
        // 5. 생성된 postId를 반환 201응답
    }
    // 게시글 수정
    static async updatePost(req: Request, res: Response, next: NextFunction) {
        // const obj = {
        //     sort: 'sale',
        //     target: 'male',
        //     item: 'top',
        //     location: '강남구',
        //     title: '제목', 
        //     price: 7000,
        //     images: [],
        //     content: 'as;dghasdfkajsdga',
        // }
    }
    // 게시글 삭제
    static async deletePost(req: Request, res: Response, next: NextFunction) {}
}

export default ExchangePostsController;