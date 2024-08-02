import { useState, useRef } from 'react';

import InputRadioGroup from '../../input/InputRadioGroup';
import InputImageFile from '../../input/InputImageFile';

import { formatNumberToCommaString, formatCommaStringToNumber } from '../../../utils/numbers';

import { apiService } from "../../../services/apiService";
import { signInController } from "../../../controllers/signInController";

import './BoardForm.css';
import { exchangePostController } from '../../../controllers/exchangePostController';

const BoardForm = () => {
    const transactionTypes = ['판매', '나눔'];
    const targets = ['남성', '여성', '아동'];
    const items = ['상의', '하의', '원피스', '셋업', '아우터'];
    const locations = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중량구']
    const defaultPhoto = [
        {
            imgSrc: '../images/ico-camera.png',
            isDefault: true,
        },
        {
            imgSrc: '../images/ico-camera.png',
            isDefault: true,
        },
        {
            imgSrc: '../images/ico-camera.png',
            isDefault: true,
        }
    ];

    const [selectedTransactionType, setSelectedTransactionType] = useState(0);
    const [selectedTargetType, setSelectedTargetType] = useState(0);
    const [selectedItemType, setSelectedItemType] = useState(0);
    const [selectedLocationType, setSelectedLocationType] = useState(0);

    const [title, setTitle] = useState('');    
    const [titleError, setTitleError] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState(defaultPhoto);

    const formTopRef = useRef({});
    const titleRef = useRef({});
    const priceRef = useRef({});
    const imgSectionRef = useRef({});
    const contentRef = useRef({});

    const handleChangeTitle = (e) => {
        const value = e.target.value;
        setTitle(value);
        if(value.length > 50){
            setTitleError('제목은 50자 이하로 입력하세요.')
        } else {
            setTitleError('');
        };
    };

    const handleChangePrice = (e) => {
        const value = e.target.value;
        const valueToNumber = formatCommaStringToNumber(value);
        if (!isNaN(valueToNumber)) {
            setPrice(valueToNumber);
        }
    };

    const setImgSrc = (index, imgSrc) => {
        const setImg = images.map((img, idx) => {
            if(idx === index){
                return {
                    imgSrc, 
                    isDefault: false
                };
            }
            return img;
        });
        setImages(setImg);
    };

    const resetImgSrc = (index) => {
        const resetImg = images.map((img, idx) => {
            if(idx === index){
                return {
                    imgSrc: '../images/ico-camera.png', 
                    isDefault: true
                };
            }
            return img;
        });
        setImages(resetImg);
    }

    const handleSetImgSrc = (idx) => (imgSrc) => setImgSrc(idx, imgSrc);
    const handleResetImgSrc = (idx) => () => resetImgSrc(idx);

    const handleChangeContent = (e) => setContent(e.target.value);

    const focusInput = (ref) => {
        if(ref && ref.current){
            ref.current.focus();
        }
    };

    const scrollToSection = (ref) => {
        if(ref && ref.current){
            ref.current.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    };

    const validateSubmit = (condition, msg, target, isSection = false) => {
        if(condition){
            alert(msg);
            if(isSection){
                scrollToSection(target);
            } else {
                focusInput(target);
            }
            return false;
        }
        return true;
    };

    const handleSubmitForm = async () => {
        const isValidImg = images.some(image => !image.isDefault);
        if(!validateSubmit(!title, '제목을 입력해주세요.', titleRef)) return;
        if(!validateSubmit(!price, '가격을 입력해주세요.', priceRef)) return;
        if(!validateSubmit(!isValidImg, '이미지를 한 장 이상 업로드해주세요.', imgSectionRef, true)) return;
        if(!validateSubmit(!content, '내용을 입력해주세요.', contentRef)) return;

        const data = {
            title,
            content,
            image: images.filter(image => !image.isDefault).map(image => image.imgSrc),
            sort: transactionTypes[selectedTransactionType],
            target: targets[selectedTargetType],
            item: items[selectedItemType],
            price: Number(price),
            location: locations[selectedLocationType],
        }

        const res = await apiService((apiClient) => exchangePostController(apiClient, data));

        if(res.status === 201){
            const { postId } = res.data;
            window.location.href=`/board/view/${postId}`;
        }
    };

    const handleResetForm = () => {
        alert('작성중인 게시글을 모두 지우시겠습니까?');
        setSelectedTransactionType(0);
        setSelectedTargetType(0);
        setSelectedItemType(0);
        setSelectedLocationType(0);
        setTitle('');
        setTitleError('');
        setPrice('');
        setImages(defaultPhoto);
        setContent('');
        scrollToSection(formTopRef);
    }

    return (
        <div className="board-form-content" ref={formTopRef}>
            <InputRadioGroup
                title="거래유형"
                id="transaction-type"
                className="transaction"
                options={transactionTypes}
                selectedOption={selectedTransactionType}
                handleRadioClick={setSelectedTransactionType}
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
            <InputRadioGroup
                title="거래위치"
                id="location-type"
                className="locations"
                options={locations}
                selectedOption={selectedLocationType}
                handleRadioClick={setSelectedLocationType}
            />
            <div className="row title">
                <h3>제목</h3>
                <p className={titleError ? "error-input" : ""}>
                    <span className="input-box">
                        <input
                            type="text"
                            id="item-title"
                            className="input-text-opacity-0"
                            value={title}
                            onChange={handleChangeTitle}
                            ref={titleRef}
                        />
                    </span>
                </p>
                {titleError && <p className="error-msg">{titleError}</p>}
            </div>
            <div className="row price">
                <h3>가격</h3>
                <p>
                    <span className="input-box">
                        <input
                            type="text"
                            id="item-price"
                            className="input-text-opacity-0"
                            value={formatNumberToCommaString(price)}
                            onChange={handleChangePrice}
                            ref={priceRef}
                        />
                    </span>
                    <span className="won">원</span>
                </p>
            </div>
            <div className="row images" ref={imgSectionRef}>
                <h3>이미지 등록하기</h3>
                <ul>
                    {images.map((image, idx) => (
                        <li key={idx}>
                            <InputImageFile
                                imgSrc={image.imgSrc}
                                setImgSrc={handleSetImgSrc(idx)}
                                isDefault={image.isDefault}
                                setIsDefault={handleResetImgSrc(idx)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="row post-content">
                <h3>글 작성하기</h3>
                <div className='post-content-box'>
                    <textarea 
                        value={content} 
                        onChange={handleChangeContent}
                        ref={contentRef}
                    ></textarea>
                </div>
            </div>
            <div className='row form-buttons'>
                <p className='btn-cancel' onClick={handleResetForm}>
                    <span className='btn-cancel-full'>취소하기</span>
                </p>
                <p className='btn-submit' onClick={handleSubmitForm}>
                    <span className='btn-primary-full'>등록하기</span>
                </p>
            </div>
        </div>
    );
};

export default BoardForm;
