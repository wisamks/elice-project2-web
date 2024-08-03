import ListFilter from "../../components/board/list/ListFilter";
import ListContent from "../../components/board/list/ListContent";

const ListPost = () => {
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
                <ListFilter />
                <ListContent />
            </div>
        </div>
    );
};

export default ListPost;