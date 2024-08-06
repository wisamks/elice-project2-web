import ItemCardVertical205 from '../../itemCard/ItemCardVertical205';
import './ViewSimilarItem.css';

const ViewSimilarItem = ({ filteredPosts, recentPosts }) => {
    let displayFilteredItems = filteredPosts;
    let displayRecentItems = [];

    if (filteredPosts.length === 0) {
        displayRecentItems = recentPosts;
    } else if (filteredPosts.length === 1 || filteredPosts.length === 2) {
        displayRecentItems = recentPosts.slice(0, 4);
    }

    return (
        <div className="view-similar-item">
            <h3 className="title">비슷한 상품 보기</h3>
            <div className="view-similar-item-list">
                {displayFilteredItems.length > 0 ? (
                    <div>
                        <h4>유사 상품</h4>
                        <ul>
                            {displayFilteredItems.map((item, idx) => (
                                <li key={idx}>
                                    <ItemCardVertical205
                                        linkURL={`/board/view/${item.postId}`}
                                        itemPhotoSrc={item.thumbnail.url}
                                        itemName={item.title}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="noSimilar">비슷한 상품이 없습니다</p>
                )}
                {displayRecentItems.length > 0 && (
                    <div className="recent">
                        <h3 className="title">최근 게시물</h3>
                        <ul>
                            {displayRecentItems.map((item, idx) => (
                                <li key={idx}>
                                    <ItemCardVertical205
                                        linkURL={`/board/view/${item.postId}`}
                                        itemPhotoSrc={item.thumbnail.url}
                                        itemName={item.title}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewSimilarItem;
