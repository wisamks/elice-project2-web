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

    const formatPrice = (price) => {
        if (price !== undefined && price !== null) {
            return `${new Intl.NumberFormat('ko-KR').format(price)} 원`;
        }
        return 'N/A';
    };

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
                <BarChart />
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
