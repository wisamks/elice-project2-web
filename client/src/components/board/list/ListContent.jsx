import { useState } from 'react';
import ItemCardVertical257 from '../../itemCard/ItemCardVertical257';

import './ListContent.css';

const ListContent = () => {
    const [isOnlyAble, setIsOnlyAble] = useState(false);

    const handleChangeOnlyAble = (e) => {
        setIsOnlyAble(e.target.checked);
    };

    return (
        <div className="list-post-content">
            <div className="list-post-content-top">
                <p className="total">총 <span className="total-num">2,152</span>개</p>
                <div className="onlyAble">
                    <p
                        className={`input-checkbox ${isOnlyAble ? "input-checkbox-active" : ""}`}
                        onClick={() => handleChangeOnlyAble}
                    >
                        <span>
                            <input
                                type="checkbox"
                                checked={isOnlyAble}
                                onChange={handleChangeOnlyAble}
                                id="onlyAbleCheck"
                            />
                        </span>
                        <label htmlFor="onlyAbleCheck">거래 가능만 보기</label>
                    </p>
                </div>
            </div>
            <div className="list-post-wrap">
                <ul>
                    <li>
                        <ItemCardVertical257 />
                    </li>
                </ul>                
            </div>
        </div>
    );
};

export default ListContent;