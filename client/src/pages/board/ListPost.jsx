import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import ListFilter from "../../components/board/list/ListFilter";
import ListOnlyAble from "../../components/board/list/ListOnlyAble";
import ListContent from "../../components/board/list/ListContent";
import BoardListPagination from '../../components/board/list/BoardListPagination';

import { getExchangeList } from '../../controllers/exchangePostController';
import { apiService } from '../../services/apiService';

import './BoardStyle.css';

const ListPost = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [isOnlyAble, setIsOnlyAble] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const page = parseInt(searchParams.get('page')) || 1;
    const perPage = 40;

    const [sortType, setSortType] = useState('전체');
    const [targetType, setTargetType] = useState('전체');
    const [itemType, setItemType] = useState('전체');
    const [price, setPrice] = useState(null);
    const [locationType, setLocationType] = useState('전체');
    
    useEffect(() => {
        if (!searchParams.has('page')) {
            setSearchParams({ page: '1' });
        }
    }, [searchParams, setSearchParams]);
    
    useEffect(() => {
        const fetchData = async () => {
            const params = {};
            if (isOnlyAble) {
                params.status = '진행';
            }
            if (sortType !== '전체') {
                params.sort = sortType;
            }
            if (targetType !== '전체') {
                params.target = targetType;
            }            
            if (itemType !== '전체') {
                params.item = itemType;
            }
            if (price !== null) {
                params.price = price;
            }            
            if (locationType !== '전체') {
                params.location = locationType;
            }
            try {
                const res = await apiService((apiClient) => getExchangeList(apiClient, page, perPage, params));
                const resItems = res.posts;
                const resTotal = res.totalPostsCount;
                setItems(resItems);
                setTotalItems(resTotal);
            } catch (error) {
                console.error('목록 조회 실패', error);
            }
        };
        fetchData();
    }, [isOnlyAble, page, sortType, targetType, itemType, price, locationType]);

    const handleChangeOnlyAble = (e) => {
        setIsOnlyAble(e.target.checked);
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
    };

    const handleSortChange = (newSortType) => {
        setSortType(newSortType);
    };

    const handleTargetChange = (newTargetType) => {
        setTargetType(newTargetType);
    };

    const handleItemChange = (newItemType) => {
        setItemType(newItemType);
    };

    const handlePriceChange = (newPrice) => {
        setPrice(newPrice);
    };

    const handleLocationChange = (newLocationType) => {
        setLocationType(newLocationType);
    };

    return (
        <div className="list-post">
            <div className="list-post-top">
                <h1 className="page-title">중고거래</h1>
                <div className="btn-go-create">
                    <Link to="/board/create">
                        <span><img src="images/ico-edit.png" alt="등록하기" /></span>
                        <span>등록하기</span>
                    </Link>
                </div>
            </div>
            <div className="list-post-wrap">
                <ListFilter
                    onSortChange={handleSortChange}
                    onTargetChange={handleTargetChange}
                    onItemChange={handleItemChange}
                    onPriceChange={handlePriceChange}
                    onLocationChange={handleLocationChange}
                />
                <div className='list-post-wrap-right'>
                    <ListOnlyAble
                        isOnlyAble={isOnlyAble}
                        handleChangeOnlyAble={handleChangeOnlyAble}
                    />
                    <ListContent
                        items={items}
                        isOnlyAble={isOnlyAble}
                        total={totalItems}
                    />
                    <BoardListPagination
                        total={totalItems}
                        page={page}
                        perPage={perPage}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListPost;
