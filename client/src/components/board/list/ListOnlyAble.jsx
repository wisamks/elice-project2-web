const ListOnlyAble = ({ isOnlyAble, handleChangeOnlyAble }) => {

    return (
        <div className="list-filter">
            <div className="onlyAble">
                <p
                    className={`input-checkbox ${isOnlyAble ? "input-checkbox-active" : ""}`}
                    onClick={handleChangeOnlyAble}
                >
                    <span>
                        <input
                            type="checkbox"
                            id="onlyAbleCheck"
                            checked={isOnlyAble}
                            readOnly
                        />
                    </span>
                    <label htmlFor="onlyAbleCheck">거래 가능만 보기</label>
                </p>
            </div>
        </div>
    );
};

export default ListOnlyAble;