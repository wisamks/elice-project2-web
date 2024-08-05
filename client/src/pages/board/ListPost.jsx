import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import ListFilter from "../../components/board/list/ListFilter";
import ListOnlyAble from "../../components/board/list/ListOnlyAble";
import ListContent from "../../components/board/list/ListContent";

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

    useEffect(() => {
        const fetchData = async () => {
            const params = {};
            try {
                const res = await apiService((apiClient) => getExchangeList(apiClient, page, perPage));
                console.log(res);
                const resItems = res.posts;
                const resTotal = res.totalPostsCount;
                setItems(resItems);
                setTotalItems(resTotal);
            } catch (error) {
                console.error('목록 조회 실패', error);
            }
        };
        fetchData();
    }, [isOnlyAble, page]);

    const handleChangeOnlyAble = (e) => {
        setIsOnlyAble(e.target.checked);
        setSearchParams({ page, isOnlyAble: e.target.checked });
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage, isOnlyAble });
    };

    return(
        <div className="list-post">
            <div className="list-post-top">
                <h1 className="page-title">중고거래</h1>
                <div className="btn-go-create">
                    <span><img src="images/ico-edit.png" alt="등록하기" /></span>
                    <span>등록하기</span>
                </div>
            </div>            
            <div className="list-post-wrap">
                <ListFilter
                />
                <ListOnlyAble 
                    isOnlyAble={isOnlyAble}
                    handleChangeOnlyAble={handleChangeOnlyAble}
                />
                <ListContent
                    items={items}
                    total={totalItems}
                    // isOnlyAble={isOnlyAble}
                    // page={page}
                    // perPage={perPage}
                    // handlePageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ListPost;