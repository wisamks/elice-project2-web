import '../../styles/account-common.css';
import './SignUp.css';

const SignUp = () => {
    return (
        <div className="SignUp account-wrap">
            <h1>회원가입</h1>
            <div className='signup-form'>
                <div className='signup-input-wrap'>
                    <label htmlFor="signup-name">이름</label>
                    <p className='signup-input-box'>
                        <input id='signup-name' className='input-text-opacity-0' />
                    </p>
                </div>
                <div className='signup-input-wrap'>
                    <label htmlFor="signup-nick">닉네임</label>
                    <p className='signup-input-box'>
                        <input placeholder='닉네임을 입력해주세요.' id='signup-nick' className='input-text-opacity-0' />
                    </p>
                </div>
                <div className='signup-input-wrap'>
                    <label htmlFor="signup-email">이메일</label>
                    <p className='signup-input-box'>
                        <input id='signup-email' className='input-text-opacity-0' />
                    </p>
                </div>
                <div className='signup-input-wrap'>
                    <label htmlFor="signup-phone">연락처</label>
                    <div className='signup-phone-wrap'>
                        <p className='signup-phone-default'>010 -</p>
                        <p className='signup-input-box signup-input-phone-num'>
                            <input placeholder='숫자만 입력해주세요.' id='signup-phone' className='input-text-opacity-0' />
                        </p>
                        <p className='signup-btn-phone-auth'>인증하기</p>
                    </div>
                </div>
                <div className='signup-auth-wrap'>
                    <p className='signup-auth-input-box'>
                        <input placeholder='인증번호' id='signup-phone-auth-number' className='input-text-opacity-0' />
                    </p>
                    <p className='signup-btn-phone-auth-submit'><span className='btn-primary-border'>확인</span></p>
                </div>
            </div>
            <div className='signup-btn-submit'><span className='btn-primary-full'>회원가입 완료하기</span></div>
        </div>
    )
}

export default SignUp;