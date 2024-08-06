import { useState } from "react";
import { Link } from "react-router-dom";
import CertificationListCard from "../../components/certification/CertificationListCard";
import CertificationModal from "../../components/certification/CertificationModal";

import './CertificationPage.css';

const CertificationPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="CertificationPage">
            <div className="certification-list-top">
                <h1 className="page-title">의류수거함 인증</h1>
                <div className="btn-go-create">
                    <Link to="/certification/create">
                        <span><img src="images/ico-edit.png" alt="등록하기" /></span>
                        <span>등록하기</span>
                    </Link>
                </div>
            </div>
            <div className="certification-list-top2">
                <div className="certification-list-total">
                    총
                    <span className="total-num">2,152</span>
                    개
                </div>
                {/*
                <div className="certification-list-sort">
                    <div className="active">
                        <span className="text">최신 순</span>
                        <span className="icon"><img src="/images/arr-down.png" /></span>
                    </div>
                    <div className="list">
                    </div>
                </div>
                */}
            </div>            
            <div className="certification-list-list">
                <ul>
                    {/* 인증게시판 목록 반복 시작*/}
                    <li onClick={handleOpenModal}>
                        <CertificationListCard />
                    </li>
                    {/* 인증게시판 목록 반복 끝*/}
                </ul>
            </div>
            {
                isModalOpen && 
                <CertificationModal 
                    handleCloseModal={handleCloseModal}
                />
            }            
        </div>
    );
};

export default CertificationPage;