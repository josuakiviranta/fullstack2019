import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => <h1>give feedback</h1>
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    const average = (good - bad) / total
    const positive = (good / total) * 100

    if (total === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <div>No feedback given</div>
            </div>
        )
    }

    return (
        <div>
            <h1>statistics</h1>
            <div>good {good}</div>
            <div>neutral {neutral}</div>
            <div>bad {bad}</div>
            <div>all {total}</div>
            <div>average {average}</div>
            <div>positive {positive} %</div>
        </div>
    )
}


const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const handleGoodClick = () => setGood(good + 1)
    const handleNeutraClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

    return (
        <div>
            <Header />
            <Button handleClick={handleGoodClick}
                text='good' />
            <Button handleClick={handleNeutraClick}
                text='neutral' />
            <Button handleClick={handleBadClick}
                text='bad' />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)