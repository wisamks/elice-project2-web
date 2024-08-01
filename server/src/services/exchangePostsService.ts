
// 중고거래 게시판 서비스
class ExchangePostsService {
    // 페이지네이션을 진행하여 필요한 게시글들 불러오는 서비스
    static async getAllPosts() {}
    static async getPostsCount(categoryId: number) {
        // categoryId를 넣으면 
        // post테이블에 user 테이블과 post_exchange_detail 테이블을 join하고
        // 전체 게시글 수를 세는 함수
    }
    static async getPosts(categoryId: number, page: number, perPage: number) {
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
    }
    // 각 게시글 당 댓글 개수를 조회하는 서비스
    static async getCommentsCount(post:any) {
        // postId를 집어넣으면 comment 테이블에서 댓글을 카운트해서 개수를 뱉어주는 모델 함수
    }
    // 사진 테이블에서 is_main을 확인해서 대문 이미지를 찾는 서비스
    static async getMainImage(post:any) {
        // postId 집어넣으면 photo 테이블에서 is_main 확인해서 true인 사진 하나를 뱉어주는 모델 함수
    }
    // 사용자가 좋아요 누른 게시글인지 확인하는 서비스
    static async checkMyFavorite() {
        // userId와 postId를 넣으면 favorite 테이블에서 찾아서 해당 정보를 뱉어주는 함수
    }
}

export default ExchangePostsService;