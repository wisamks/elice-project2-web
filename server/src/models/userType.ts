// user모델 최대한 쪼개고 나중에 합쳐보기
// type은 추가 불가, interface는 항목 추가 가능, ?는 optional

export type SnsCode = 'google' | 'naver' | 'kakao';

export interface User {
    id: number;            // readonly?
    email: string;
    nickname: string;
    phone: string; 
    profileImage?: string | null;       // 이미지가 없으면 null로 두고 프론트 단에서 띄울것인가?
    name: string
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;            // null 인 상태가 활성계정, Date가 있으면 삭제된 계정(비활성)?
    snsCode: SnsCode;
}

// db에서 자동 생성되는 id, timestamp제외(omit)
export type UserCreationData = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' >;

// snscode는 변동 되면 안되니 추가해둠
export type UserUpdateData = Partial<Omit<User, 'id' | 'email' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'snsCode'>>;