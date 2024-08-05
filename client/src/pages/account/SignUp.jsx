// import React, { useState, useEffect } from 'react';

// import '../../styles/account-common.css';
// import './SignUp.css';

// const SignUp = () => {
// //     const [name, setName] = useState('');
// //     const [email, setEmail] = useState('');
//     const [nickname, setNickname] = useState('');
//     const [isNicknameValid, setIsNicknameValid] = useState(false);
//     const [validationMessage, setValidationMessage] = useState('');

//     //네이버, 구글을 통해 사용자정보 불러옴
//     //어떻게 가져오지?

//     //닉네임 변경되면 유효성 상태 초기화
//     const handleNicknameChange = (e) => {
//         setNickname(e.target.value);
//         setIsNicknameValid(false);
//         setValidationMessage('');
//     };

//     //프론트 측 닉네임 길이에 대한 유효성 검사
//     const checkNickname = async () => {
//         if (nickname.length < 3 || nickname.length > 10) {
//             setIsNicknameValid(false);
//             setValidationMessage('3자 이상 10자 이하로 입력해주세요.');
//             return false;
//         }
//         //프론트 측 유효성 검사 통과 후 백엔드 측에 닉네임 중복에 대한 유효성 검사 요청
//         try {
//             const res = await fetch('http://localhost:8080/api/auth/nickname', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ nickname }),
//             });
//             const result = await res.json();
//             setIsNicknameValid(result.isAvailable);
//             setValidationMessage(result.isAvailable ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.');
//         } catch (error) {
//             console.error('Nickname check failed', error);
//             setIsNicknameValid(false);
//             setValidationMessage('닉네임 유효성 검사를 실패했습니다.');
//             return false;
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const isAvailable = await checkNickname();
//         if (isAvailable) {
//             try {
//                 const res = await fetch('http://localhost:8080/api/auth/join', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ name, email, nickname }),
//                 });
//                 const result = await res.json();
//                 if (result.success) {
//                     console.log('회원가입 성공');
//                     window.location.href = '/sign-in'
//                 }
//             } catch (error) {
//                 console.error('Signup failed', error);
//             }
//         }
//     };

//     return (
//         <div className="SignUp account-wrap">
//             <h1>회원가입</h1>
//             <div className='signup-form'>
//                 <div className='signup-input-wrap'>
//                     <label htmlFor="signup-name">이름</label>
//                     <p className='signup-input-box'>
//                         <input id='signup-name' className='input-text-opacity-0' value={name} readOnly />
//                     </p>
//                 </div>
//                 <div className='signup-input-wrap'>
//                     <label htmlFor="signup-nick">닉네임</label>
//                     <p className='signup-input-box'>
//                         <input placeholder='닉네임을 입력해주세요.' id='signup-nick' className='input-text-opacity-0' value={nickname} onChange={handleNicknameChange} />

//                     </p>
//                     {validationMessage && <p className='validation-message' style={{ color: isNicknameValid ? '#ccc' : 'red' }}>{validationMessage}</p>}
//                 </div>
//                 <div className='signup-input-wrap'>
//                     <label htmlFor="signup-email">이메일</label>
//                     <p className='signup-input-box'>
//                         <input id='signup-email' className='input-text-opacity-0' value={email} readOnly />
//                     </p>
//                 </div>
//                 {/* <div className='signup-input-wrap'>
//                     <label htmlFor="signup-phone">연락처</label>
//                     <div className='signup-phone-wrap'>
//                         <p className='signup-phone-default'>010 -</p>
//                         <p className='signup-input-box signup-input-phone-num'>
//                             <input placeholder='숫자만 입력해주세요.' id='signup-phone' className='input-text-opacity-0' />
//                         </p>
//                         <p className='signup-btn-phone-auth'>인증하기</p>
//                     </div>
//                 </div>
//                 <div className='signup-auth-wrap'>
//                     <p className='signup-auth-input-box'>
//                         <input placeholder='인증번호' id='signup-phone-auth-number' className='input-text-opacity-0' />
//                     </p>
//                     <p className='signup-btn-phone-auth-submit'><span className='btn-primary-border'>확인</span></p>
//                 </div> */}
//             </div>
//             <div className='signup-btn-submit'><span className='btn-primary-full' onClick={handleSubmit}>회원가입 완료하기</span></div>
//         </div>
//     )
// }

// export default SignUp;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './account-common.css';
import './SignUp.css';

const SignUp = () => {
  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const navigate = useNavigate();

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameValid(false);
    setValidationMessage('');
  };

  const checkNickname = async () => {
    if (nickname.length < 3 || nickname.length > 10) {
      setIsNicknameValid(false);
      setValidationMessage('3자 이상 10자 이하로 입력해주세요.');
      return false;
    }
    try {
      const res = await fetch('http://localhost:8080/api/auth/nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
        credentials: 'include',
      });

      if (res.status === 204) {
        setIsNicknameValid(true);
        setValidationMessage('사용 가능한 닉네임입니다.');
        return true;
      } else if (res.status === 409) {
        const result = await res.json();
        setIsNicknameValid(false);
        setValidationMessage(result.error || '이미 사용 중인 닉네임입니다.');
        return false;
      } else {
        const result = await res.json();
        setIsNicknameValid(false);
        setValidationMessage(
          result.error || '닉네임 유효성 검사를 실패했습니다.'
        );
        return false;
      }
    } catch (error) {
      console.error('Nickname check failed', error);
      setIsNicknameValid(false);
      setValidationMessage('닉네임 유효성 검사를 실패했습니다.');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNicknameValid) {
      try {
        const res = await fetch('http://localhost:8080/api/auth/join', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nickname }),
          credentials: 'include',
        });
        if (res.ok) {
          console.log('Nickname submission');
          navigate('/', {
            state: {
              refresh: true,
            },
          });
        } else {
          console.error('Signup failed:', res.status);
        }
      } catch (error) {
        console.error('Nickname submission failed', error);
      }
    } else {
      setValidationMessage('닉네임 중복 확인을 해주세요.');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('#header') || event.target.closest('#footer')) {
        event.preventDefault();
        event.stopPropagation();
        alert('닉네임 설정을 완료해주세요.');
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className='SignUp account-wrap'>
      <h1>닉네임 설정하기</h1>
      <div className='signup-form'>
        <div className='signup-input-wrap'>
          <label htmlFor='signup-nick'>닉네임</label>
          <p className='signup-input-box'>
            <input
              placeholder='닉네임을 입력해주세요.'
              id='signup-nick'
              className='input-text-opacity-0'
              value={nickname}
              onChange={handleNicknameChange}
            />
          </p>
          <button className='validation-btn' onClick={checkNickname}>
            중복확인
          </button>
        </div>
        {validationMessage && (
          <p
            className='validation-message'
            style={{ color: isNicknameValid ? '#00A040' : 'red' }}
          >
            {validationMessage}
          </p>
        )}
      </div>
      <div className='signup-btn-submit'>
        <span className='btn-primary-full' onClick={handleSubmit}>
          닉네임 설정 완료하기
        </span>
      </div>
    </div>
  );
};

export default SignUp;
