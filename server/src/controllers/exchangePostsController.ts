import {Request, Response, NextFunction} from 'express';
import ExchangePostsService from '@_services/exchangePostsService';
import { BadRequestError, UnauthorizedError } from '@_/utils/customError';
import { ReqUser } from '@_/customTypes/express';

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
        // 1. postId path로 받아오기 
        // 2-1. postId로 게시글 가져오기 -> 없으면 404
        // 2-2. postId로 사진 가져오기 3개
        // 2-3. postId로 사진 총 개수 가져오기
        // 2-4. postId로 사진에서 is_main이 true인 거 찾기
        // 2-5. postId로 댓글 개수 조회
        // 2-6. postId로 좋아요 개수 조회
        // 2-7. userId와 postId 집어넣어서 좋아요 검색
        // 3. 가져온 게시글의 filter들을 이용해서 중고거래 게시판 목록 1페이지 8개를 출력
        // 댓글은 따로 클라이언트에게 api조회 시키기
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
        const currUser = req.user as ReqUser;
        const userId = currUser.userId;
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
        // 1. const userId = req.user.userId;
        // 2. postId 패스파라미터로 받아오기
        // 3. postId로 게시글 찾아서 userId 일치하는지 확인 -> 아니면 403 에러, 못 찾았으면 404 에러
        // 4-1. postId로 title, content수정 post 테이블
        // 4-2. postId로 sort, target, item, location, price 수정 post_exchange_detail 테이블
        // 4-3. postId로 images수정
        // 5. 성공 시 204 No Content 응답
    }

    // ReqUser = req.user
    static async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
          const user = req.user as ReqUser | undefined;
          
          // 사용자 확인 => 없으면 에러
          if (!user) {
            throw new UnauthorizedError('사용자 인증이 필요합니다.');
          }

          // params에서 postId추출 radix 지정으로 변경안되게(10, 8, 16)진수 등..
          const postId = parseInt(req.params.postId, 10);
          
          // postId가 유요하지 않은 경우
          if (isNaN(postId)) {
            throw new BadRequestError('유효하지 않은 게시글 ID입니다.');
          }
          // model -> service 이용해서 게시글 삭제(비즈니스로직은 서비스로..분리)
          await ExchangePostsService.deletePost(postId, user.userId);
    
          res.status(204).end();
        } catch (error) {
          next(error);
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