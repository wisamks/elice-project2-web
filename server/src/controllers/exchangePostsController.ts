import {Request, Response, NextFunction} from 'express';

import ExchangePostsService from '@_services/exchangePostsService';

// 중고거래 게시판 컨트롤러
class ExchangePostsController {
    // 목록 조회
    static async findPosts(req: Request, res: Response, next: NextFunction) {
        // 쿼리 파라미터로 페이지와 페이지 별 게시글 개수 가져오기(number 변환 잊지 말기)
        // 쿼리 파라미터로 카테고리 아이디를 가져와서 필요한 게시글 구분하기
        // 이후 필터 관련 변수들 추가되면 추가하기
        const {perPage, page, categoryId} = req.query;
        // 1. 페이지네이션을 진행하여 필요한 게시글들 불러오는 서비스
        const _categoryId = Number(categoryId);
        const _page = page ? Number(page) : 1;
        const _perPage = perPage ? Number(perPage) : 40;
        const totalPostsCount = ExchangePostsService.getPostsCount(_categoryId);
        const foundPosts = ExchangePostsService.getPosts(_categoryId, _page, _perPage);
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
        // body 입력값 
        const obj = {
            sort: 'sale',
            target: 'male',
            item: 'top',
            location: '강남구'
        }
    }
    // 게시글 수정
    static async updatePost(req: Request, res: Response, next: NextFunction) {}
    // 게시글 삭제
    static async deletePost(req: Request, res: Response, next: NextFunction) {}
}

export default ExchangePostsController;