import React, { useState } from 'react';
import { likeController } from '../../controllers/likeController';
import { apiService } from '../../services/apiService';
import './LikeBtn.css';

const LikeBtn = ({ postId, isMyFavorite }) => {
    const [liked, setLiked] = useState(isMyFavorite);

    const handleLikeClick = async (e) => {
        e.preventDefault();
        setLiked(!liked);
        await apiService((apiClient) => likeController(apiClient, postId));
    };

    return (
        <div className="like-button" onClick={handleLikeClick}>
            <img src={liked ? "/images/ico-like-active.png" : "/images/ico-like.png"} alt="좋아요" />
        </div>
    );
};

export default LikeBtn;