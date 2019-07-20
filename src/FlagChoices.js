import React from 'react';
import StyledButton from './StyledButton';
import './FlagChoices.css';

const FlagChoices = props => {
    let choices = props.options || [];
    const { handleChange, handleSubmit } = props;
    let inputs = choices.map(i => (
        <label key={i.id}>
            <input type="radio"
                value={i.id}
                checked={i.checked}
                onChange={handleChange}
                name="flag-choice" />
            {i.name}
        </label>
    ));

    return (
        <form className="flag-form" onSubmit={handleSubmit}>
            <div className="flag-inputs">
                {inputs}
            </div>
            <StyledButton text="GUESS" type="submit" />
        </form>
    );
}

export default FlagChoices;