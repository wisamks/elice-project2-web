import { useState, useEffect } from 'react';
import ItemCardHorizontal from '../itemCard/ItemCardHorizontal';
import { formatDateToString } from "../../utils";
import { getExchangeList } from '../../controllers/exchangePostController';
import { apiService } from '../../services/apiService';

import './RecentPosts.css'

const RecentPosts = () => {    
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            const res = await apiService((apiClient) => getExchangeList(apiClient, 1, 5));
            setRecentPosts(res.posts);
        };

        fetchRecentPosts();
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

    return (
        <div className="board-form-side">
            <h3>최근 게시물</h3>
            <div>
                <ul>
                    {recentPosts.map((recentPost, idx) => (
                        <li key={idx}>
                            <ItemCardHorizontal
                                linkURL={`../view/${recentPost.postId}`}
                                itemPhotoSrc={recentPost.thumbnail} 
                                itemStatus={getStatusClass(recentPost.sort, recentPost.status)}
                                itemStatusTxt={getStatusText(recentPost.sort, recentPost.status)} 
                                itemName={recentPost.title}
                                userProfileSrc={recentPost.userImage}
                                userName={recentPost.nickname}
                                saleLocation={recentPost.location}
                                itemUpdate={formatDateToString(recentPost.createdAt)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecentPosts;
