// 숫자 세 자리 콤마, 문자형으로 변환 됨
export const formatNumberToCommaString = (number) => {
    return number ? Number(number).toLocaleString() : number;
};

// 콤마 지우고 숫자형으로 변환
export const formatCommaStringToNumber = (formattedNumber) => {
    return Number(formattedNumber.replace(/,/g, ''));
};

// 날짜 표시형식 -> 2024.7.15
export const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    return `${year}.${month}.${day}`;
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
            top : offsetPosition,
            behavior: 'smooth'
        });
    }
};

