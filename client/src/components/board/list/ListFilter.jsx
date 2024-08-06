import { useState, useEffect } from 'react';
import FilterSection from '../FilterSection';

import './ListFilter.css';

const ListFilter = ({ filters, onFilterChange, onSearch }) => {
    const sortTypes = ['전체', '판매', '나눔'];
    const targets = ['전체', '남성', '여성', '아동'];
    const items = ['전체', '상의', '하의', '원피스', '셋업', '아우터'];
    const priceRanges = [
        { min: 0, max: Infinity },
        { min: 0, max: 1000 },
        { min: 1000, max: 4999 },
        { min: 5000, max: 9999 },
        { min: 10000, max: 29999 },
        { min: 30000, max: 49999 },
        { min: 50000, max: Infinity }
    ];
    const priceRangeLabels = [
        '전체',
        '1,000원 미만',
        '1,000 ~ 5,000원 미만',
        '5,000 ~ 10,000원 미만',
        '10,000 ~ 30,000원 미만',
        '30,000 ~ 50,000원 미만',
        '50,000원 이상'
    ];
    const locations = ['전체', '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중량구'];

    const [selectedSortType, setSelectedSortType] = useState(0);
    const [selectedTargetType, setSelectedTargetType] = useState(0);
    const [selectedItemType, setSelectedItemType] = useState(0);
    const [selectedPriceRange, setSelectedPriceRange] = useState(0);
    const [selectedLocationType, setSelectedLocationType] = useState(0);

    useEffect(() => {
        onFilterChange({
            sortType: selectedSortType,
            targetType: selectedTargetType,
            itemType: selectedItemType,
            priceRange: selectedPriceRange,
            locationType: selectedLocationType,
        });
    }, [selectedSortType, selectedTargetType, selectedItemType, selectedPriceRange, selectedLocationType]);

    return (
        <div className='list-post-filter'>
            <FilterSection
                selectedSortType={selectedSortType}
                setSelectedSortType={setSelectedSortType}
                selectedTargetType={selectedTargetType}
                setSelectedTargetType={setSelectedTargetType}
                selectedItemType={selectedItemType}
                setSelectedItemType={setSelectedItemType}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                selectedLocationType={selectedLocationType}
                setSelectedLocationType={setSelectedLocationType}
                sortTypes={sortTypes}
                targets={targets}
                items={items}
                priceRangeLabels={priceRangeLabels}
                locations={locations}
            />
            <div className='btn-filter-submit' onClick={onSearch}><span className='btn-primary-full'>검색하기</span></div>
        </div>
    );
};

export default ListFilter;
