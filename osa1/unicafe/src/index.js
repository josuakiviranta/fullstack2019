import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => <h1>give feedback</h1>
const Statistics = () => <h1>statistics</h1>
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)


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
            <Statistics />
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)