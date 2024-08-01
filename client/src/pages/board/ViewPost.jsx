import ViewPhoto from '../../components/board/view/ViewPhoto';
import ViewItemInfo from '../../components/board/view/ViewItemInfo';
import ViewItemDescription from '../../components/board/view/ViewItemDescription';
import ViewComment from '../../components/board/view/ViewComment';
import ViewSimilarItem from '../../components/board/view/ViewSimilarItem';

import './ViewPost.css'
import { useNavigate } from 'react-router-dom';

const ViewPost = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="view-post">
            <div className="view-post-row1">
                <div className="go-back-page" onClick={handleGoBack}>
                    <span className="ico"><img src="../images/ico-back.png" /></span>
                    <span className="txt">돌아가기</span>
                </div>
            </div>
            <div className="view-post-row2">
                <ViewPhoto />
            </div>
            <div className="view-post-row3">
                <ViewItemInfo />
            </div>            
            <div className="view-post-row4">
                <div className="view-post-row4-column1">
                    <div className="view-post-row4-column1-1">
                        <ViewItemDescription />
                    </div>
                    <div className="view-post-row4-column1-2">
                        <ViewComment />
                    </div>
                </div>
                <div className="view-post-row4-column2">
                    <ViewSimilarItem />
                </div>
            </div>
        </div>
    );
};

export default ViewPost;