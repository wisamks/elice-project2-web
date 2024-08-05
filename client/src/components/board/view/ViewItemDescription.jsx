import './ViewItemDescription.css';

const ViewItemDescription = ({ content }) => {
    return(
        <div className="view-post-item-description">
            <h3>상세설명</h3>
            <div className="item-description">
                {content}
            </div>
        </div>
    );
};

export default ViewItemDescription;