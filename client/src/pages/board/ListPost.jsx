import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import ListFilter from "../../components/board/list/ListFilter";
import ListOnlyAble from "../../components/board/list/ListOnlyAble";
import ListContent from "../../components/board/list/ListContent";

import { getExchangeList } from '../../controllers/exchangePostController';
import { apiService } from '../../services/apiService';

import './BoardStyle.css';

const ListPost = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isOnlyAble, setIsOnlyAble] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const page = parseInt(searchParams.get('page')) || 1;
    const perPage = 40;

    const [filters, setFilters] = useState({
        sortType: '',
        targetType: '',
        itemType: '',
        priceRange: '',
        locationType: '',
    });

    const fetchData = async (filters) => {
        try {
            const res = await apiService((apiClient) => getExchangeList(apiClient, page, perPage, filters));
            const resItems = res.posts;
            const resTotal = res.totalPostsCount;
            setItems(resItems);
            setTotalItems(resTotal);
            setFilteredItems(resItems);
        } catch (error) {
            console.error('목록 조회 실패', error);
        }
    };

    useEffect(() => {
        fetchData(filters);
    }, [isOnlyAble, page, filters]);

    const handleChangeOnlyAble = (e) => {
        setIsOnlyAble(e.target.checked);
        const statusValue = isOnlyAble ? '진행' : '';
        setSearchParams({ page, perPage, status: statusValue });
        const newFilters = { ...filters, status: statusValue };
        fetchData(newFilters);
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage, isOnlyAble });
        fetchData(filters);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleSearch = () => {
        fetchData(filters);
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
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                />
                <ListOnlyAble 
                    isOnlyAble={isOnlyAble}
                    handleChangeOnlyAble={handleChangeOnlyAble}
                />
                <ListContent
                    items={filteredItems}
                    total={totalItems}
                    isOnlyAble={isOnlyAble}
                    page={page}
                    perPage={perPage}
                    handlePageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ListPost;
