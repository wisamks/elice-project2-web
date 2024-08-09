import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = ({ chartPeriod, chartName, chartData, chartBg, chartBorder }) => {
    const data = {
        labels: chartPeriod,
        datasets: [
            {
                label: chartName,
                data: chartData,
                backgroundColor: chartBg,
                borderColor: chartBorder,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        if(value > 10000){
                            return (value / 10000).toLocaleString('ko-KR');
                        } else {
                            return value.toLocaleString('ko-KR');
                        }
                    }
                }
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;