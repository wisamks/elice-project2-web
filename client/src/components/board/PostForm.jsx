import { useState, useRef, useEffect } from 'react';

import FilterSection from './FilterSection';
import InputImageFile from '../input/InputImageFile';

import { formatNumberToCommaString, formatCommaStringToNumber, focusInput, scrollToSection } from '../../utils';
import { setImgSrc, resetImgSrc } from '../../utils/imageUtils';

import './PostForm.css';

const PostForm = ({ initialPost, onSubmit, formType }) => {
    const sortTypes = ['판매', '나눔'];
    const targets = ['남성', '여성', '아동'];
    const items = ['상의', '하의', '원피스', '셋업', '아우터'];
    const locations = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중량구'];
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

    const [selectedSortType, setSelectedSortType] = useState(0);
    const [selectedTargetType, setSelectedTargetType] = useState(0);
    const [selectedItemType, setSelectedItemType] = useState(0);
    const [selectedLocationType, setSelectedLocationType] = useState(0);

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');
    const [price, setPrice] = useState(0);
    const [content, setContent] = useState('');
    const [images, setImages] = useState(defaultPhoto);

    const formTopRef = useRef({});
    const titleRef = useRef({});
    const priceRef = useRef({});
    const imgSectionRef = useRef({});
    const contentRef = useRef({});

    useEffect(() => {
        if (initialPost) {
            setSelectedSortType(sortTypes.indexOf(initialPost.sort));
            setSelectedTargetType(targets.indexOf(initialPost.target));
            setSelectedItemType(items.indexOf(initialPost.item));
            setSelectedLocationType(locations.indexOf(initialPost.location));

            setTitle(initialPost.title);
            setPrice(initialPost.price);
            setContent(initialPost.content);

            setImages(
                initialPost.photos.map(photo => ({
                    imgSrc: photo,
                    isDefault: false
                })).concat(defaultPhoto.slice(initialPost.photos.length))
            );
        }
    }, [initialPost]);

    const handleChangeTitle = (e) => {
        const value = e.target.value;
        setTitle(value);
        if (value.length > 50) {
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

    const handleSetImgSrc = (idx) => (imgSrc, file) => {
        const updatedImages = setImgSrc(images, idx, imgSrc, file);
        setImages(updatedImages);
    };

    const handleResetImgSrc = (idx) => () => {
        const updatedImages = resetImgSrc(images, idx);
        setImages(updatedImages);
    };

    const handleChangeContent = (e) => setContent(e.target.value);

    const validateSubmit = (condition, msg, target, isSection = false) => {
        if (condition) {
            alert(msg);
            if (isSection) {
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
        if (!validateSubmit(!title, '제목을 입력해주세요.', titleRef)) return;
        if (!validateSubmit(!price, '가격을 입력해주세요.', priceRef)) return;
        if (!validateSubmit(!isValidImg, '이미지를 한 장 이상 업로드해주세요.', imgSectionRef, true)) return;
        if (!validateSubmit(!content, '내용을 입력해주세요.', contentRef)) return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('target', targets[selectedTargetType]);
        formData.append('item', items[selectedItemType]);
        formData.append('price', Number(price));
        formData.append('location', locations[selectedLocationType]);
        formData.append('sort', sortTypes[selectedSortType]);

        const validImages = images.filter(image => !image.isDefault);
        validImages.forEach(image => {
            formData.append('images', image.file);
        });

        onSubmit(formData);
    };

    const handleResetForm = () => {
        if (!title && !price && !content && images.every(image => image.isDefault)) {
            return;
        }

        if (window.confirm('작성중인 게시글을 모두 지우시겠습니까?')) {
            setSelectedSortType(0);
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
    };

    return (
        <div className="board-form-content" ref={formTopRef}>
            <FilterSection
                selectedSortType={selectedSortType}
                setSelectedSortType={setSelectedSortType}
                selectedTargetType={selectedTargetType}
                setSelectedTargetType={setSelectedTargetType}
                selectedItemType={selectedItemType}
                setSelectedItemType={setSelectedItemType}
                selectedLocationType={selectedLocationType}
                setSelectedLocationType={setSelectedLocationType}
                sortTypes={sortTypes}
                targets={targets}
                items={items}
                locations={locations}
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
                <p className={selectedSortType === 1 ? "readOnly" : ""}>
                    <span className="input-box">
                        <input
                            type="text"
                            id="item-price"
                            className="input-text-opacity-0"
                            value={selectedSortType === 1 ? '0' : formatNumberToCommaString(price)}
                            onChange={handleChangePrice}
                            ref={priceRef}
                            readOnly={selectedSortType === 1}
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
                    <span className='btn-primary-full'>
                        {formType === 'edit' ? '수정하기' : '등록하기'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default PostForm;