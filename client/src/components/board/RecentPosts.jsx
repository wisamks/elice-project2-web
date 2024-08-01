import ItemCardHorizontal from "../itemCard/ItemCardHorizontal";

import './RecentPosts.css'

// 게시글 더미데이터. DB연결후 삭제. 각 key값 DB와 확인해서 맞추기
const dummyData = [
    {
        linkURL: "/board/view/1",
        itemPhotoSrc: "../images/item/men/setup/men_setup_2.jpg",
        itemStatus: "item-status-sale-ing",
        itemStatusTxt: "판매 진행",
        itemName: "남자 반팔, 반바지 셋업",
        userProfileSrc: "../images/profile/profile01.png",
        userName: "퍼스트펭귄",
        saleLocation: "성동구",
        itemUpdate: "2024-07-24"
    },
    {
        linkURL: "/board/view/2",
        itemPhotoSrc: "../images/item/men/setup/men_setup_1.jpg",
        itemStatus: "item-status-free-ing",
        itemStatusTxt: "나눔 진행",
        itemName: "남자 반팔, 반바지 셋업222",
        userProfileSrc: "../images/profile/profile01.png",
        userName: "퍼스트펭귄",
        saleLocation: "성동구",
        itemUpdate: "2024-07-24"
    },
    {
        linkURL: "/board/view/3",
        itemPhotoSrc: "../images/item/men/setup/men_setup_4.jpg",
        itemStatus: "item-status-free-rsv",
        itemStatusTxt: "나눔 예약",
        itemName: "남자 반팔, 반바지 셋업333",
        userProfileSrc: "../images/profile/profile01.png",
        userName: "퍼스트펭귄",
        saleLocation: "성동구",
        itemUpdate: "2024-07-24"
    },
    {
        linkURL: "/board/view/4",
        itemPhotoSrc: "../images/item/men/setup/men_setup_3.jpg",
        itemStatus: "item-status-sale-rsv",
        itemStatusTxt: "판매 예약",
        itemName: "남자 반팔, 반바지 셋업444",
        userProfileSrc: "../images/profile/profile01.png",
        userName: "퍼스트펭귄",
        saleLocation: "성동구",
        itemUpdate: "2024-07-24"
    },
    {
        linkURL: "/board/view/5",
        itemPhotoSrc: "../images/item/men/setup/men_setup_5.jpg",
        itemStatus: "item-status-free-end",
        itemStatusTxt: "나눔 종료",
        itemName: "남자 반팔, 반바지 셋업555",
        userProfileSrc: "../images/profile/profile01.png",
        userName: "퍼스트펭귄",
        saleLocation: "성동구",
        itemUpdate: "2024-07-24"
    }
];

const RecentPosts = () => {
    return (
        <div className="board-form-side">
            <h3>최근 게시물</h3>
            <div>
                <ul>
                    {dummyData.map((item, idx) => (
                        <li key={idx}>
                            <ItemCardHorizontal
                                linkURL={item.linkURL}
                                itemPhotoSrc={item.itemPhotoSrc} 
                                itemStatus={item.itemStatus}
                                itemStatusTxt={item.itemStatusTxt} 
                                itemName={item.itemName}
                                userProfileSrc={item.userProfileSrc}
                                userName={item.userName}
                                saleLocation={item.saleLocation}
                                itemUpdate={item.itemUpdate}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecentPosts;