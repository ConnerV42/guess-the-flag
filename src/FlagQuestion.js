import React, { Component } from "react";
import FlagChoices from "./FlagChoices";
import FlagAnswer from "./FlagAnswer";
import "./FlagQuestion.css";

const QuestionStates = {
    QUESTION: 1,
    INCORRECT: 2,
    CORRECT: 3
};

class FlagQuestion extends Component {
    static defaultProps = {
        options: []
    }

    constructor(props) {
        super(props);
        this.state = {
            userChoice: undefined
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        //e.preventDefault();
        this.setState({ userChoice: Number(e.target.value) });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onGuess(this.state.userChoice);
    }

    render() {
        const {
            flag,
            questionState,
            options,
            answerText,
            onNext
        } = this.props;
        const { userChoice } = this.state;
        let choices = options.map(i => ({
            ...i,
            checked: userChoice === i.id
        }));

        let output = questionState === QuestionStates.QUESTION ?
            (<FlagChoices handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                options={choices} />) :
            (<FlagAnswer
                correct={questionState === QuestionStates.CORRECT}
                answer={answerText}
                onNext={onNext} />);

        return (
            <div className="flag-question">
                <img
                    className="flag-img"
                    src={flag}
                    alt="Guess the flag"
                />
                {output}
            </div>
        );
    }
}
export default FlagQuestion;
export { QuestionStates };