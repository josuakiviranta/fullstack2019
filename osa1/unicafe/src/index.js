import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => <h1>give feedback</h1>
const StatisticText = () => <h1>statistics</h1>
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ value, text }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    const average = (good - bad) / total
    const positiveProsent = (good / total) * 100 + ' %'

    if (total === 0) {
        return (
            <div>
                <div>No feedback given</div>
            </div>
        )
    }

    return (
        <div>
            <table>
                <Statistic text="good" value={good} />
                <Statistic text="neutral" value={neutral} />
                <Statistic text="bad" value={bad} />
                <Statistic text="all" value={total} />
                <Statistic text="average" value={average} />
                <Statistic text="positive" value={positiveProsent} />
            </table>
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
            <StatisticText />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)