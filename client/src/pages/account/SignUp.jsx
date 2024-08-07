import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './account-common.css';
import './SignUp.css';
import { baseURI } from '../../controllers/baseURI';

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
            const res = await fetch(`${baseURI}/api/auth/nickname`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nickname }),
                credentials: "include"
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
                setValidationMessage(result.error || '닉네임 유효성 검사를 실패했습니다.');
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
                const res = await fetch(`${baseURI}/api/auth/join`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nickname }),
                    credentials: "include"
                });
                if (res.ok) {
                    console.log('Nickname submission');
                    navigate('/');
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
        <div className="SignUp account-wrap">
            <h1>닉네임 설정하기</h1>
            <div className='signup-form'>
                <div className='signup-input-wrap'>
                    <label htmlFor="signup-nick">닉네임</label>
                    <p className='signup-input-box'>
                        <input placeholder='닉네임을 입력해주세요.' id='signup-nick' className='input-text-opacity-0' value={nickname} onChange={handleNicknameChange} />
                    </p>
                    <button className="validation-btn" onClick={checkNickname}>중복확인</button>
                </div>
                {validationMessage && <p className='validation-message' style={{ color: isNicknameValid ? '#00A040' : 'red' }}>{validationMessage}</p>}
            </div>
            <div className='signup-btn-submit'><span className='btn-primary-full' onClick={handleSubmit}>닉네임 설정 완료하기</span></div>
        </div>
    );
}

export default SignUp;
