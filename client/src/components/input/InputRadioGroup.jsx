import './InputRadioGroup.css';

const InputRadioGroup = ({ title, id, className, options, selectedOption, handleRadioClick }) => {
    return (
        <div className={`row ${className}`}>
            <h3>{title}</h3>
            <div className="input-radio-wrap">
                {options.map((option, index) => (
                    <p
                        key={index}
                        className={`input-radio ${selectedOption === index ? 'input-radio-active' : ''}`}
                        onClick={() => handleRadioClick(index)}
                    >
                        <span>
                            <input
                                type="radio"
                                value={option}
                                id={`${id}-${index}`}
                                checked={selectedOption === index}
                                onChange={() => handleRadioClick(index)}
                            />
                        </span>
                        <label htmlFor={`${id}-${index}`}>{option}</label>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default InputRadioGroup;