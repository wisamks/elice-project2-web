export enum PostStatus {
    '예약' = '예약',
    '진행' = '진행',
    '완료' = '완료'
}

export type Status = '예약' | '진행' | '완료';

export type PostSort = '판매' | '나눔';

export interface Post {
    id: number;       // (PK)
    user_id: number;       // userid - FK(user table)
    category_id: number;   // categoryid - FK (category table)
    title: string;         
    content: string;       
    created_at: Date;      
    updated_at: Date;      
    deleted_at: Date | null; 
}

export type PostCreation = Omit<Post, 'id'|'created_at'|'updated_at'|'deleted_at'>;

// postExchangeDetail
export interface PostExchangeDetail {
    status: PostStatus;    
    item: string;     
    target: string;   
    location: string; 
    price: number;    // 0 or (price > 0) ?
    sort: PostSort;
}

// post + postExchangeDetail (조회용!)
export interface PostWithDetails extends Post, PostExchangeDetail {
    nickname: string;    // 게시글 작성자의 닉네임 (User 테이블에서 가져옴)
    user_image: string;  // 게시글 작성자의 프로필 이미지 URL (User 테이블에서 가져옴)
    reserver_id: number;
}

// 새 게시글 생성 시 필요한 데이터 타입
export type PostCreationData = Omit<Post, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> & PostExchangeDetail;

// 게시글 수정 시 사용할 수 있는 부분적 데이터 타입
export type PostUpdateData = Partial<Pick<Post, 'title' | 'content' | 'status'>> & Partial<PostExchangeDetail>;



// 검색용 진행 예정
export interface PostSearchCriteria {
    category_id?: number;
    user_id?: number;
    status?: PostStatus;
    start_date?: Date;
    end_date?: Date;
    keyword?: string;
}

export interface Paginations {
    categoryId: number;
    page: number;
    perPage: number;
}

export interface Filters {
    sort?: PostSort;
    target?: string;
    item?: string;
    price?: number;
    location?: string;
    status?: Status;
}