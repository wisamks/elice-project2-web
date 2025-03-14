import React from 'react';
import { Line } from 'react-chartjs-2';

const d1_startYear = 2007;
const d1_endYear = 2022;
const d1_years = [];
for (let year = d1_startYear; year <= d1_endYear; year++) {
    d1_years.push(year);
}

// 데이터 포인트 개수
const dataCount = d1_endYear - d1_startYear + 1;

// 파란색 배열 채우기 (앞쪽 데이터)
const blue = [];
for (let i = 0; i < dataCount - 3; i++) {
    blue.push('rgba(139, 198, 74, 0.3)');
}

// 빨간색 배열 채우기 (마지막 3개의 데이터)
const red = [];
for (let i = 0; i < 3; i++) {
    red.push('rgba(0, 160, 64, 0.2)');
}

// 두 배열을 합침
const backgroundColors = blue.concat(red);

// 경계 색상도 동일한 방법으로 처리
const blueBorder = [];
for (let i = 0; i < dataCount - 3; i++) {
    blueBorder.push('rgba(139, 198, 74, 0.5)');
}

const redBorder = [];
for (let i = 0; i < 3; i++) {
    redBorder.push('rgba(0, 160, 64, 0.5)');
}

const borderColors = blueBorder.concat(redBorder);

const data = {
    labels: d1_years,
    datasets: [
        {
            label: '전국 폐의류 배출량 추이',
            data: [44530, 54677, 58619, 64057, 69131, 66430, 46318, 74350, 53399, 58692, 65043, 66320, 51757, 82422, 118386, 106536],
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
            fill: false, // 선 그래프에서 채우기 옵션
            tension: 0.1, // 선의 부드러움을 조절
        },
    ],
};

const options = {
    plugins: {
        legend: {
            position: 'bottom', // 라벨 위치를 아래쪽으로 설정
        },
    },
    scales: {
        y: {
            beginAtZero: true
        }
    },
};

const MyLineChart = () => {
    return <Line data={data} options={options} />;
};

export default MyLineChart;
