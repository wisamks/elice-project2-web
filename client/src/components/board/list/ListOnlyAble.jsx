const ListOnlyAble = ({ isOnlyAble, handleChangeOnlyAble }) => {
    return (
        <div className="list-filter">
            <div className="onlyAble">
                <p
                    className={`input-checkbox ${isOnlyAble ? "input-checkbox-active" : ""}`}
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
    );
};

export default ListOnlyAble;