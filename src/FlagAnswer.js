import React from 'react';
import StyledButton from './StyledButton';
import './FlagAnswer.css';

const FlagAnswer = ({ correct, answer, onNext }) => (
    <div className='flag-answer'>
        <div className='text'>
            {correct ?
                `Correct! ${answer}` :
                `Incorrect! Correct Answer: ${answer}`}
        </div>
        <StyledButton text="NEXT" onClick={onNext} />
    </div >
);

export default FlagAnswer;