import { useState, useRef } from 'react';

import InputRadioGroup from '../../input/InputRadioGroup';
import InputImageFile from '../../input/InputImageFile';

import { formatNumberToCommaString, formatCommaStringToNumber, focusInput, scrollToSection } from '../../../utils';

import './EditForm.css';

const EditForm = ({ post, onSubmit }) => {
    return(
        <div>수정페이지
        EditForm과 CreateForm 완전 같음. 
        공통으로 사용하도록 수정하기
        </div>
    );
};

export default EditForm;