const ListOnlyAble = ({ isOnlyAble, handleChangeOnlyAble }) => {
    const handleClickAble = (e) => {
        e.preventDefault();
        handleChangeOnlyAble({ target: { checked: !isOnlyAble } });
    };

    return (
        <div className="list-filter">
            <div className="onlyAble">
                <p
                    className={`input-checkbox ${isOnlyAble ? "input-checkbox-active" : ""}`}
                    onClick={handleClickAble}
                >
                    <span>
                        <input
                            type="checkbox"
                            id="onlyAbleCheck"
                            checked={isOnlyAble}
                            onChange={handleChangeOnlyAble}
                        />
                    </span>
                    <label htmlFor="onlyAbleCheck">거래 가능만 보기</label>
                </p>
            </div>
        </div>
    );
};

export default ListOnlyAble;