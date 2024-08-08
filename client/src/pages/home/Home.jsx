import React, { useState, useEffect } from 'react';
import BarChart from '../../components/chart/BarChart';

import './Home.css';

const Home = () => {
    // 상태 정의
    const [postsExchange, setPostsExchange] = useState([]);
    const [postsCertification, setPostsCertification] = useState([]);
    const [error, setError] = useState(null);

    // 데이터 가져오는 로직
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // 교환 게시판과 인증 게시판의 데이터 제한 수를 쿼리 파라미터로 설정
                const exchangeLimit = 4; // 교환 게시판에 표시할 게시물 수
                const binLimit = 12;     // 인증 게시판에 표시할 게시물 수

                const response = await fetch(`http://localhost:8080/api/home?exchangeLimit=${exchangeLimit}&binLimit=${binLimit}`);

                if (!response.ok) {
                    throw new Error('데이터를 가져오는 중 문제가 발생했습니다.');
                }

                const data = await response.json();

                if (data.error) {
                    setError(data.error);
                } else {
                    // 응답 데이터에서 교환 및 인증 게시판 데이터 설정
                    setPostsExchange(data.exchangePosts || []);
                    setPostsCertification(data.binPosts || []);
                    console.log(data); // 콘솔에 데이터 출력
                }
            } catch (err) {
                console.error('데이터 가져오기 오류:', err);
                setError('데이터를 가져오는 중 오류가 발생했습니다.');
            }
        };

        fetchPosts();
    }, []);


    const getStatusClass = (sort, status) => {
        if (sort === '나눔') {
            if (status === '진행') return 'item-status item-status-free-ing';
            if (status === '예약') return 'item-status item-status-free-rsv';
            if (status === '완료') return 'item-status item-status-free-end';
        } else if (sort === '판매') {
            if (status === '진행') return 'item-status item-status-sale-ing';
            if (status === '예약') return 'item-status item-status-sale-rsv';
            if (status === '완료') return 'item-status item-status-sale-end';
        }
        return 'item-status';
    };

    const getStatusText = (sort, status) => {
        if (sort === '나눔') {
            if (status === '진행') return '나눔 진행';
            if (status === '예약') return '나눔 예약';
            if (status === '완료') return '나눔 완료';
        } else if (sort === '판매') {
            if (status === '진행') return '판매 진행';
            if (status === '예약') return '판매 예약';
            if (status === '완료') return '판매 완료';
        }
        return '';
    };


    // 차트데이터 1
    const d1_chart_name = '전국 폐의류 배출량 추이(단위: 만)';

    const d1_startYear = 2007;
    const d1_endYear = 2022;
    const d1_years = [];
    for (let year = d1_startYear; year <= d1_endYear; year++) {
        d1_years.push(year);
    };

    const d1_data_value = [44530, 54677, 58619, 64057, 69131, 66430, 46318, 74350, 53399, 58692, 65043, 66320, 51757, 82422, 118386, 106536];

    const d1_dataCount = d1_endYear - d1_startYear + 1;

    const d1_bgColor1 = [];
    for (let i = 0; i < d1_dataCount - 3; i++) {
        d1_bgColor1.push('rgba(139, 198, 74, 0.3)');
    }

    const d1_bgColor2 = [];
    for (let i = 0; i < 3; i++) {
        d1_bgColor2.push('rgba(0, 160, 64, 0.2)');
    }

    const d1_backgroundColors = d1_bgColor1.concat(d1_bgColor2);

    const d1_borderColor1 = [];
    for (let i = 0; i < d1_dataCount - 3; i++) {
        d1_borderColor1.push('rgba(139, 198, 74, 0.5)');
    }

    const d1_borderColor2 = [];
    for (let i = 0; i < 3; i++) {
        d1_borderColor2.push('rgba(0, 160, 64, 0.5)');
    }

    const d1_borderColors = d1_borderColor1.concat(d1_borderColor2);


    const formatPrice = (price) => {
        if (price !== undefined && price !== null) {
            return `${new Intl.NumberFormat('ko-KR').format(price)} 원`;
        }
        return 'N/A';
    };

    // 차트2번 데이터
    const d2_chart_name = '전세계 의류산업 이산화탄소 배출량(단위: Mt CO2)';

    const d2_years = [];
    const d2_startYear = 2019;
    const d2_endYear = 2030;
    for (let year = d2_startYear; year <= d2_endYear; year++) {
        d2_years.push(year);
    };

    const d2_data_value = [1025, 1067, 1110, 1155, 1202, 1251, 1301, 1354, 1409, 1466, 1526, 1588];
    const d2_backgroundColors = 'rgba(139, 198, 74, 0.3)';
    const d2_borderColors = 'rgba(139, 198, 74, 0.5)';

    // const d2_years = [2020, 2021, 2022, 2023, 2024];
    // const d2_chart_name = '의류 판매량';
    // const d2_data_value = [51798172, 60183548, 64236055, 68757856, 73005128];
    // const d2_backgroundColors = 'rgba(139, 198, 74, 0.3)';
    // const d2_borderColors = 'rgba(139, 198, 74, 0.5)';

    // // 차트3번 데이터
    // const d3_years = [2005, 2010, 2016, '2030(추정)']
    // const d3_chart_name = '의류산업에서 배출되는 온실가스'
    // const d3_data_value = [2440000000, 2840000000, 3290000000, 4910000000]
    // const d3_backgroundColors = 'rgba(0, 160, 64, 0.2)'
    // const d3_borderColors = 'rgba(0, 160, 64, 0.5)'


    return (
        <div className="Home">
            <div className='Home-main01'>
                <div className='image'><p><img src='images/home-img01.jpg' alt='' /></p></div>
                <div className='text'>
                    <p className='txt1'>EarthCloset</p>
                    <p className='txt2'>옷의 <strong>순환</strong>이 곧 지구의 <strong>기쁨</strong>입니다</p>
                </div>
            </div>
            <div className="Home-main02">
                <h2>중고거래</h2>
                <div className="posts">
                    {postsExchange.map((post) => (
                        <div key={post.postId} className="post">
                            <div className="post-thumbnail imgFrame">
                                <img src={post.thumbnail?.url || "/images/ico-hanger.png"} alt={post.title} className="post-image" />
                            </div>
                            <div className="post-details">
                                <div className="post-status-item">
                                    <p className={getStatusClass(post.sort, post.status)}>
                                        {getStatusText(post.sort, post.status)}
                                    </p>
                                    <p className="post-item">{post.item || 'N/A'}</p>
                                </div>
                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-price">{formatPrice(post.price)}</p>
                                <div className="post-profile">
                                    <p className="post-profile-img imgFrame"><img src={post.userImage} alt="프로필사진" className="post-user" /></p>
                                    <p className="post-author">{post.nickname}</p>
                                </div>
                                {post.badge && <span className="badge">{post.badge}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="Home-main03">
                <div className="Home-main03-1">
                    <p className="bg imgFrame"><img src="/images/home-img031.jpg" alt='옷무덤' /></p>
                    <div className='content'>
                        <p className='txt1'>
                            <span>지구를 지키는 작은 한 걸음,</span>
                            <strong>중고 의류 구매</strong>
                        </p>
                        <p className='txt2'>엄청난 양의 <span>의류 폐기물</span>이 매년 발생하고 있다는 걸 아십니까?</p>
                        <div className='chart1'>
                            <BarChart
                                chartPeriod={d1_years}
                                chartName={d1_chart_name}
                                chartData={d1_data_value}
                                chartBg={d1_backgroundColors}
                                chartBorder={d1_borderColors}
                            />
                        </div>
                        <div className='txt3'>
                            출처 :  <br />
                            2001 ~ 2019 전국 생활 폐기물 배출량, <br />
                            2020 ~ 2022 전국 생활 폐기물 배출량<br />
                            (KOSIS 국가통계포털)
                        </div>
                    </div>
                </div>
                <div className="Home-main03-2">
                    <p className="text1">새롭게 판매되는 의류와 함께 <span>온실가스</span>도 늘어갑니다!</p>
                    <div className="charts">
                        <BarChart
                            chartPeriod={d2_years}
                            chartName={d2_chart_name}
                            chartData={d2_data_value}
                            chartBg={d2_backgroundColors}
                            chartBorder={d2_borderColors}
                        />
                    </div>
                    <p className="text2">
                        출처 :  <br />
                        <a href="https://www.daenews.co.kr/20763" target="_blank">동아경제 기사 발췌</a><br/>
                        스타티스타
                    </p>
                </div>
                <div className="Home-main03-3">
                    <p className="bg imgFrame"><img src="/images/home-img032.jpg" /></p>
                    <div className="text">
                        <p className="txt1">옷의 <strong>순환</strong>이 곧 지구의 <strong>기쁨</strong>입니다
                        </p>
                        <p className="txt2">EarthCloset</p>
                    </div>
                </div>
            </div>
            <div className="Home-main04">
                <h2>의류수거함 인증</h2>
                <div className="posts">
                    {postsCertification.map((post) => (
                        <div key={post.postId} className="post-certification imgFrame">
                            <img src={post.thumbnail?.url} alt={`Certification Post ${post.postId}`} className="post-certification-image" />
                            {/* 인증 게시판의 경우 추가 정보가 필요하다면 여기에 추가 */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
