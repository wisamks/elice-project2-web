import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import InputImageFile from '../../components/input/InputImageFile';
import './CertificationForm.css';

const CertificationForm = () => {
  const [formData, setFormData] = useState({
    categoryId: 2, // 카테고리 ID를 2로 설정
    title: '',
    content: '',
    images: [],
  });

  const [imgSrc, setImgSrc] = useState('/images/ico-camera.png');
  const [isDefault, setIsDefault] = useState(true);

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 이미지 변경 핸들러
  const handleImageChange = (imageDataUrl, imageFile) => {
    setImgSrc(imageDataUrl);
    setFormData((prevState) => ({
      ...prevState,
      images: [imageDataUrl], // 이미지 URL을 배열에 추가
    }));
    setIsDefault(false);
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = () => {
    setImgSrc('/images/ico-camera.png');
    setIsDefault(true);
    setFormData((prevState) => ({
      ...prevState,
      images: [], // 이미지 배열 초기화
    }));
  };

  // 입력 내용 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 게시글 등록 함수
  const submitPost = async () => {
    const data = {
      categoryId: formData.categoryId,
      title: formData.title,
      content: formData.content,
      images: formData.images,
    };

    try {
      const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include', // withCredentials 대체
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        throw new Error('게시글 등록에 실패했습니다.');
      }

      alert('게시글이 성공적으로 등록되었습니다.');
      setFormData({ categoryId: 2, title: '', content: '', images: [] });
      setImgSrc('/images/ico-camera.png');
      setIsDefault(true);

      navigate('/certification');
    } catch (error) {
      console.error('게시글 등록 중 오류 발생:', error);
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <div className="CertificationForm">
      <div className="certification-form-top">
        <h1 className="page-title">의류수거함 인증 작성하기</h1>
      </div>
      <div className="certification-form-wrap">
        <InputImageFile 
          imgSrc={imgSrc}
          setImgSrc={handleImageChange} 
          isDefault={isDefault}
          setIsDefault={handleDeleteImage} 
        />
        <div className='form-right'>
          <div className='input-content-box'>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="내용을 입력하세요"
              required
            ></textarea>
          </div>
          <div className='btn-box'>
            <p className='btn-cancel'>
              <span className='btn-cancel-full'>취소하기</span>
            </p>
            <p className='btn-submit' onClick={submitPost}>
              <span className='btn-primary-full'>등록하기</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationForm;
