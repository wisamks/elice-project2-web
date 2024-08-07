import './BoardListPagination.css';

const BoardListPagination = ({ total, page, perPage, handlePageChange }) => {
    const totalPages = Math.ceil(total / perPage);
    return (
        <div className="BoardListPagination">
            <button
                className="prev"
                onClick={() => handlePageChange(page - 1)} disabled={page === 1}
            >
                <img src='/images/arr-prev.png' alt='이전으로' />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={page === index + 1 ? 'active' : ''}
                >
                    {index + 1}
                </button>
            ))}
            <button
                className="next"
                onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}
            >
                <img src='/images/arr-next.png' alt='다음으로' />
            </button>
        </div>
    );
};

export default BoardListPagination;