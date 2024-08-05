import ItemCardVertical205 from '../../itemCard/ItemCardVertical205';
import './ViewSimilarItem.css';

// 게시글 더미데이터. DB연결후 삭제. 각 key값 DB와 확인해서 맞추기
const dummyData = [
    {
        linkURL: "/board/view/1",
        itemPhotoSrc: "/images/item/men/setup/men_setup_2.jpg",
        itemName: "남자 반팔, 반바지 셋업",
    },
    {
        linkURL: "/board/view/2",
        itemPhotoSrc: "/images/item/men/setup/men_setup_1.jpg",
        itemName: "남자 반팔, 반바지 셋업222",
    },
    {
        linkURL: "/board/view/3",
        itemPhotoSrc: "/images/item/men/setup/men_setup_4.jpg",
        itemName: "남자 반팔, 반바지 셋업333",
    },
    {
        linkURL: "/board/view/4",
        itemPhotoSrc: "/images/item/men/setup/men_setup_3.jpg",
        itemName: "남자 반팔, 반바지 셋업444",
    },
    {
        linkURL: "/board/view/5",
        itemPhotoSrc: "/images/item/men/setup/men_setup_5.jpg",
        itemName: "남자 반팔, 반바지 셋업555",
    },
    {
        linkURL: "/board/view/6",
        itemPhotoSrc: "/images/item/women/setup/women_setup_1.jpg",
        itemName: "남자 반팔, 반바지 셋업666",
    },
    {
        linkURL: "/board/view/7",
        itemPhotoSrc: "/images/item/women/setup/women_setup_2.jpg",
        itemName: "남자 반팔, 반바지 셋업777",
    },
    {
        linkURL: "/board/view/8",
        itemPhotoSrc: "/images/item/women/setup/women_setup_3.jpg",
        itemName: "남자 반팔, 반바지 셋업888",
    }
];

const ViewSimilarItem = () => {
    return (
        <div className="view-similar-item">
            <h3 className="title">비슷한 상품 보기</h3>
            <div className="view-similar-item-list">
                <ul>
                    {dummyData.map((item, idx) => (
                        <li key={idx}>
                            <ItemCardVertical205
                                linkURL={item.linkURL}
                                itemPhotoSrc={item.itemPhotoSrc}
                                itemName={item.itemName}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ViewSimilarItem;