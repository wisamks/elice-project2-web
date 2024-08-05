import ItemCardVertical257 from '../../itemCard/ItemCardVertical257';

import './ListContent.css';

const ListContent = ({ items, total }) => {
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
                    {items.map((item, idx) => (
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