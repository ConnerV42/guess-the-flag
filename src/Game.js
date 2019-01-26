import React, { Component } from "react";
import "./Game.css";
import FlagQuestion from "./FlagQuestion";

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
                const correctOption = countries[Math.floor(Math.random() * countries.length)];
                const options = this.getOptions(correctOption, countries);
                this.setState({
                    countries: countries,
                    options: options,
                    correctOption: correctOption,
                    questionState: QuestionStates.QUESTION
                });
            })
            .catch(console.warn);
    }

    // onGuess(answer)

    // nextQuestion()

    getOptions(correctOption, countries) {
        const options = [correctOption];

        let tries = 0;
        while (options.length < 4 && tries < 15) {
            let option = Math.floor(Math.random() * countries.length);
            if (options.indexOf(option) === -1) {
                options.push(option);
            } else {
                tries++;
            }
        }
        return options; // options is an array of index'es that correspond to 4 choices in
    }                   // the countries array

    render() {
        const style = {
            marginTop: "15px"
        };

        let {
            countries,
            correctOption,
            options,
            questionState
        } = this.state;

        let output = <div>Loading...</div>;

        if (countries !== undefined) {
            const name = countries[correctOption].name;
            const flag = countries[correctOption].flag;

            let choices = options.map(choice => {
                return {
                    id: choice,
                    name: countries[choice].name
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
            )
        }

        return (
            <div className="Game" style={style}>
                {output}
            </div>
        )
    }


}

export default Game;