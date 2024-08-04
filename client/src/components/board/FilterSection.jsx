import InputRadioGroup from '../input/InputRadioGroup';

const FilterSection = ({
    selectedSortType,
    setSelectedSortType,
    selectedTargetType,
    setSelectedTargetType,
    selectedItemType,
    setSelectedItemType,
    selectedPriceRange,
    setSelectedPriceRange,
    selectedLocationType,
    setSelectedLocationType,
    sortTypes,
    targets,
    items,
    priceRangeLabels,
    locations
}) => {
    return (
        <>
            <InputRadioGroup
                title="거래유형"
                id="sort-type"
                className="sort"
                options={sortTypes}
                selectedOption={selectedSortType}
                handleRadioClick={setSelectedSortType}
            />
            <InputRadioGroup
                title="대상"
                id="target-type"
                className="target"
                options={targets}
                selectedOption={selectedTargetType}
                handleRadioClick={setSelectedTargetType}
            />
            <InputRadioGroup
                title="아이템"
                id="item-type"
                className="items"
                options={items}
                selectedOption={selectedItemType}
                handleRadioClick={setSelectedItemType}
            />
            {priceRangeLabels && selectedPriceRange !== undefined && setSelectedPriceRange && (
                <InputRadioGroup
                    title="가격"
                    id="price-range"
                    className="price-range"
                    options={priceRangeLabels}
                    selectedOption={selectedPriceRange}
                    handleRadioClick={setSelectedPriceRange}
                />
            )}
            <InputRadioGroup
                title="거래위치"
                id="location-type"
                className="locations"
                options={locations}
                selectedOption={selectedLocationType}
                handleRadioClick={setSelectedLocationType}
            />
        </>
    );
};

export default FilterSection;