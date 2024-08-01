// 숫자 세 자리 콤마, 문자형으로 변환 됨
export const formatNumberToCommaString = (number) => {
    return number ? Number(number).toLocaleString() : number;
};

// 콤마 지우고 숫자형으로 변환
export const formatCommaStringToNumber = (formattedNumber) => {
    return Number(formattedNumber.replace(/,/g, ''));
};