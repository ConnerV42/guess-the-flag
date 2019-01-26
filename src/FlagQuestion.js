import React, { Component } from "react";
//import FlagChoices from "FlagChoices";
//import FlagAnswer from "FlagAnswer";
//import "./FlagQuestion.css";

const QuestionStates = {
    QUESTION: 1,
    INCORRECT: 2,
    CORRECT: 3
};

class FlagQuestion extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="flag-question"></div>
        );
    }
}

export default FlagQuestion;