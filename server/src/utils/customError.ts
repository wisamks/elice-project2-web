
 // BadRequestError
 // 잘못된 요청을 보낸 경우 발생하는 에러
 // 예시 : 게시물 등록 시 필수 항목 누락, 클라가 잘못된 url 형식으로 요청 보낸 경우

export class BadRequestError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message); 
        this.statusCode = 400; 
        this.name = 'BadRequestError'; 
    }
}


 // UnauthorizedError
 // 인증이 필요하지만 실패했거나 아직 제공되지 않은 경우 발생하는 에러
 // 예시 : 인증되지 않은 사용자 로그인, 유효하지 않은 토근으로 접근 시도할 때
 
export class UnauthorizedError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message); 
        this.statusCode = 401; 
        this.name = 'UnauthorizedError'; 
    }
}

 // ForbiddenError
 // 서버가 요청을 이해했지만 권한 때문에 승인하지 않는 경우 발생하는 에러
 // 예시 : 다른 유저의 게시물 또는 거래 내역을 삭제 시도할 때?

export class ForbiddenError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message); 
        this.statusCode = 403; 
        this.name = 'ForbiddenError'; 
    }
}

 // ConflictError
 // 현재 리소스 상태와 충돌하여 요청을 완료할 수 없는 경우 발생
 // 예시 : 닉네임 등 이미 존재하는 데이터가 있을 때 사용

export class ConflictError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message); // 부모 클래스 (Error)의 생성자를 호출하여 메시지를 설정합니다.
        this.statusCode = 409; // HTTP 상태 코드를 409으로 설정합니다.
        this.name = 'ConflictError'; // 에러 이름을 'ConflictError'로 설정합니다.
    }
}


 // InternalServerError
 // 서버에서 예기치 않은 조건이 발생하여 요청을 처리할 수 없는 경우 발생하는 에러
 // 일반적인 기본 에러 메시지

export class InternalServerError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message); 
        this.statusCode = 500; 
        this.name = 'InternalServerError'; 
    }
}
