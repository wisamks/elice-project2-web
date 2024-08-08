import { baseURI } from '../../controllers/baseURI';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import './CertificationForm.css'; // 기존 스타일을 포함

const CertificationForm = () => {
  const [formData, setFormData] = useState({
    categoryId: 2, // 카테고리 ID를 2로 설정
    content: '', // 게시글 내용
    imageFile: null, // 선택된 이미지 파일
    imageUrl: '', // 서버에서 받은 이미지 URL
  });

  const [imgSrc, setImgSrc] = useState('/images/ico-camera.png'); // 기본 이미지
  const [isDefault, setIsDefault] = useState(true); // 기본 이미지 상태 여부

  const navigate = useNavigate();

  // 이미지 파일 선택 및 압축 핸들러
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const validFileTypes = ['image/jpeg', 'image/png'];

    if (file && validFileTypes.includes(file.type)) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
        };

        // 이미지 압축
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onload = () => {
          setImgSrc(reader.result); // 이미지 미리보기 설정
          setFormData((prevState) => ({
            ...prevState,
            imageFile: compressedFile, // 압축된 파일 설정
          }));
          setIsDefault(false); // 기본 이미지 상태 해제
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('이미지 압축 중 오류 발생:', error);
        alert('이미지 압축에 실패했습니다.');
      }
    } else {
      alert('올바른 형식의 파일을 선택해주세요. (jpg, png)');
    }
  };

  // 입력 내용 변경 핸들러
  const handleContentChange = (e) => {
    setFormData({ ...formData, content: e.target.value });
  };

  // 이미지 업로드 함수
  const uploadImage = async () => {
    if (!formData.imageFile) {
      return ''; // 이미지가 없을 경우 빈 문자열 반환
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append('images', formData.imageFile); // 이미지 파일 추가

    try {
      const response = await fetch(`${baseURI}/api/images/upload`, {
        method: 'POST',
        body: formDataToUpload,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('이미지 업로드 실패:', errorText);
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      const data = await response.json();
      return data.urls[0]; // 서버에서 반환한 첫 번째 이미지 URL
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      alert('이미지 업로드에 실패했습니다.');
      throw error;
    }
  };

  // 게시글 등록 함수
  const submitPost = async () => {
    try {
      // 이미지 업로드 및 URL 획득
      const imageUrl = await uploadImage();

      const data = {
        categoryId: formData.categoryId,
        content: formData.content,
        images: imageUrl ? [imageUrl] : [''], // 업로드된 이미지 URL 사용, 없으면 빈 문자열 배열
      };

      const response = await fetch(`${baseURI}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('게시글 등록 실패:', errorText);
        throw new Error('게시글 등록에 실패했습니다.');
      }

      alert('게시글이 성공적으로 등록되었습니다.');
      // 등록 완료 후 상태 초기화
      setFormData({ categoryId: 2, content: '', imageFile: null, imageUrl: '' });
      setImgSrc('/images/ico-camera.png');
      setIsDefault(true);

      navigate('/certification');
    } catch (error) {
      console.error('게시글 등록 중 오류 발생:', error);
      alert('게시글 등록에 실패했습니다.');
    }
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = () => {
    setImgSrc('/images/ico-camera.png');
    setFormData((prevState) => ({
      ...prevState,
      imageFile: null,
    }));
    setIsDefault(true);
  };

  return (
    <div className="CertificationForm">
      <div className="certification-form-top">
        <h1 className="page-title">의류수거함 인증 작성하기</h1>
      </div>
      <div className="certification-form-wrap">
        <div className="input-image-file">
          <p className={`img-view ${isDefault ? 'default imgFrame' : 'imgFrame'}`}>
            <img
              src={imgSrc}
              alt="Preview"
            />
          </p>
          <p className="img-file">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              name="images"
            />
          </p>
          <p
            className={`img-file-close ${isDefault ? 'hide' : 'show'}`}
            onClick={handleDeleteImage}
          >
            <img src="/images/ico-close-bk.png" alt="등록된 이미지 삭제하기" />
          </p>
        </div>
        <div className='form-right'>
          <div className='input-content-box'>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleContentChange}
              placeholder="내용을 입력하세요."
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
