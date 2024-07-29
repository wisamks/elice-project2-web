// user모델 최대한 쪼개고 나중에 합쳐보기
// type은 추가 불가, interface는 항목 추가 가능, ?는 optional


export type SnsCode = 'google' | 'naver' | 'kakao';

export interface User {
    id: number;            // readonly?
    email: string;
    nickname: string | null;            // oauth 후 회원가입 하면서 추가
    phone: string;                      // oauth 후에 수정해도되고 받아 올 수 있으면 받아오게
    profileImage?: string | null;       // 이미지가 없으면 null로 두고 프론트 단에서 띄울것인가?
    name: string
    snsCode: SnsCode;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;            // null 인 상태가 활성계정, Date가 있으면 삭제된 계정(비활성)
}


export interface OauthUserInfo{
    email: string;
    name: string;
    picture?: string,
    snsCode: SnsCode;
}

// db에서 자동 생성되는 id, timestamp제외(omit)
export type UserCreationData = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' >;

export type UserUpdateData = Partial<Pick<User, 'nickname' | 'phone' | 'profileImage'>>;


// 유저가 추가 가능한 데이터
export interface UserRegistrationData {
    nickname: string;
    phone?: string;
}