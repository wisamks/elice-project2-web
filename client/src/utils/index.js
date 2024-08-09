// 숫자 세 자리 콤마, 문자형으로 변환 됨
export const formatNumberToCommaString = (number) => {
    return number ? Number(number).toLocaleString() : number;
};

// 콤마 지우고 숫자형으로 변환
export const formatCommaStringToNumber = (formattedNumber) => {
    return Number(formattedNumber.replace(/,/g, ''));
};

// 날짜 표시형식 -> 2024.7.15
// export const formatDateToString = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}.${month}.${day}`;
// };

// 날짜를 포맷팅하는 함수
export const formatDateToString = (createdAt) => {
    if (!createdAt) return '날짜 정보 없음';

    const date = new Date(createdAt);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds}초 전`;
    } else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        return `${diffInMinutes}분 전`;
    } else if (diffInSeconds < 86400) {
        const diffInHours = Math.floor(diffInSeconds / 3600);
        return `${diffInHours}시간 전`;
    } else if (diffInSeconds < 172800) { // 2 days in seconds
        const diffInDays = Math.floor(diffInSeconds / 86400);
        return `${diffInDays}일 전`;
    } else {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    }
};





// 포커스 이동
export const focusInput = (ref) => {
    if (ref && ref.current) {
        ref.current.focus();
    }
};

// 스크롤 위치 이동
export const scrollToSection = (ref, offset = -100) => {
    if (ref && ref.current) {
        const targetPosition = ref.current.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition + offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

