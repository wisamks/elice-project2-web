import InputImageFile from '../../components/input/InputImageFile';
import './CertificationForm.css'

const CertificationForm = () => {
    return(
        <div className="CertificationForm">
            <div className="certification-form-top">
                <h1 className="page-title">의류수거함 인증 작성하기</h1>
            </div>
            <div className="certification-form-wrap">
                <InputImageFile 
                    imgSrc="/images/ico-camera.png"
                    // setImgSrc={}
                    isDefault={true}
                    // setIsDefault={}
                />
                <div className='form-right'>
                    <div className='input-content-box'>
                        <textarea></textarea>
                    </div>
                    <div className='btn-box'>
                        <p className='btn-cancel'>
                            <span className='btn-cancel-full'>취소하기</span>
                        </p>
                        <p className='btn-submit'>
                            <span className='btn-primary-full'>등록하기</span>
                        </p>
                    </div>                    
                </div>
            </div>
        </div>
    );
};

export default CertificationForm;