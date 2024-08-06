import ItemCardVertical257 from '../../itemCard/ItemCardVertical257';

import './ListContent.css';

const ListContent = ({ items, isOnlyAble, total, page, perPage, handlePageChange }) => {
    const totalPages = Math.ceil(total / perPage);
    const filteredItems = isOnlyAble
        ? items.filter(item => item.status === '진행' && (item.sort === '판매' || item.sort === '나눔'))
        : items;

    return (
        <div className="list-post-content">
            <div className="list-post-content-top">
                <p className="total">
                    총
                    <span className="total-num">
                        {total}
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
            <div className="pagination">
                <button 
                    className="prev"
                    onClick={() => handlePageChange(page - 1)} disabled={page === 1}
                >
                    <img src='/images/arr-prev.png' alt='이전으로' />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={page === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button 
                    className="next"
                    onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}
                >
                    <img src='/images/arr-next.png' alt='다음으로' />
                </button>
            </div> 
        </div>
    );
};

export default ListContent;