export enum SnsCode {
    google = 'google',
    naver = 'naver'
}          // snscode 서비스단에서?

export interface User {
    id: number;            // readonly?
    email: string;
    nickname: string;            // oauth 후 회원가입 하면서 추가 == 초기 null
    image: string | null;       
    name: string;
    snsCode: SnsCode;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;            // null 인 상태가 활성계정, Date가 있으면 삭제된 계정(비활성)
}

// oauth 해당 내용으로 변경 예정
export interface OAuthUserInfo{
    email: string;
    name: string;
    picture?: string,   
    snsCode: SnsCode;        
}

// joinUser
export interface JoinUser {
    email: string;
    name: string;
    image?: string;
    nickname: string;
    snsCode: SnsCode;
}

// db에서 자동 생성되는 id, timestamp제외(omit)
export type UserCreationData = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' >;

export type UserUpdateData = Partial<Pick<User, 'nickname' | 'image'>>;



