import ItemCardVertical257 from '../../itemCard/ItemCardVertical257';

import './ListContent.css';

const ListContent = ({ items, isOnlyAble, total, page, perPage, handlePageChange }) => {
    const filteredItems = isOnlyAble
        ? items.filter(item => item.status === '진행' && (item.sort === '판매' || item.sort === '나눔'))
        : items;

    return (
        <div className="list-post-content">
            <div className="list-post-content-top">
                <p className="total">
                    총
                    <span className="total-num">
                        {total > 0 ? total : 0}
                    </span>
                    개
                </p>
            </div>
            <div className="list-post-wrap">
                <ul>
                    {filteredItems.map((item, idx) => (
                        <li key={idx}>
                            <ItemCardVertical257 item={item} />
                        </li>
                    ))}
                </ul>
            </div>
            {/* <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>이전</button>
                <button onClick={() => handlePageChange(page + 1)}>다음</button>
            </div> */}
        </div>
    );
};

export default ListContent;