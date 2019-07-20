import React, { Component } from "react";
import FlagQuestion, { QuestionStates } from "./FlagQuestion.js";
import shuffle from "shuffle-array";
import "./Game.css";

class Game extends Component { // owns state about what you get back from api 
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
            options: [],
            correctOption: undefined,
            questionState: undefined
        }

        this.onGuess = this.onGuess.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    componentDidMount() {
        fetch("https://restcountries.eu/rest/v2/all")
            .then(data => data.json())
            .then(countries => {
                const correctOption = Math.floor(Math.random() * countries.length);
                const options = this.getOptions(correctOption, countries);
                this.setState({
                    countries,
                    correctOption,
                    options,
                    questionState: QuestionStates.QUESTION
                });
            })
            .catch(console.warn);
    }

    onGuess(answer) {
        const { correctOption } = this.state;
        let questionState = answer === correctOption ?
            QuestionStates.CORRECT :
            QuestionStates.INCORRECT;
        this.setState({ questionState });
    }

    nextQuestion() {
        const { countries } = this.state;
        const correctOption = Math.floor(Math.random() * countries.length);
        const options = this.getOptions(correctOption, countries);
        this.setState({
            correctOption,
            options,
            questionState: QuestionStates.QUESTION
        });
    }

    getOptions(correctOption, countries) {
        let options = [correctOption];
        let tries = 0;
        while (options.length < 4 && tries < 15) {
            let option = Math.floor(Math.random() * countries.length);
            if (options.indexOf(option) === -1) {
                options.push(option);
            } else {
                tries++;
            }
        }
        return shuffle(options); // options is an array of index'es chosen from countries array
    }

    render() {
        let {
            countries,
            correctOption,
            options,
            questionState
        } = this.state;

        let output = <div>Loading...</div>;
        if (correctOption !== undefined) {
            const { name, flag } = countries[correctOption];

            let choices = options.map(i => {
                return {
                    id: i,
                    name: countries[i].name
                }
            });

            output = (
                <FlagQuestion
                    answerText={name}
                    onGuess={this.onGuess}
                    onNext={this.nextQuestion}
                    options={choices}
                    questionState={questionState}
                    flag={flag}
                />
            );
        }
        return (
            <div className="Game">
                {output}
            </div>
        );
    }
}
export default Game;