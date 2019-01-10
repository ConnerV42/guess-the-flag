import React, { Component } from "react";
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
                    correctOption: correctOption
                });
            });
    }

    getOptions(correctOption, countries) {
        const options = [];

        // Fill options array with 4 random countries
        for (let i = 0; i < 4; i++) {
            options[i] = Math.floor(Math.random() * countries.length);
        }

        // Select a random index in the options array and fill
        const index = Math.floor(Math.random() * options.length);
        options[index] = correctOption;
    }

    render() {
        const style = {
            marginTop: "15px"
        };

        return (
            <div className="Game" style={style}>

            </div>
        )
    }


}

export default Game;