import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ click, text }) => (
    <div>
        <button onClick={click}>{text}</button>
    </div>
)

const Anecdote = ({header, anecdote, votes}) => {
    return (
        <div>
            <h1>Anecdote {header}</h1>
            {anecdote}
            <div>has {votes} votes</div>
        </div>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [maxVoted, setMaxVoted] = useState(0)
    const points = new Uint8Array(anecdotes.length)
    const [pointsArray, setPointsArray] = useState(points)
    const handleClick = () => {
        const randNum = Math.floor(Math.random() * anecdotes.length)
        setSelected(randNum)
        refresh()
    }
    
    const makeVote = () => {
        pointsArray[selected] += 1
        setPointsArray(pointsArray)
        refresh()
        if (pointsArray[selected] > pointsArray[maxVoted]) {
            setMaxVoted(selected)
        }
    }
    
    return (
        <div>
            <Anecdote header={"of the day"} anecdote={anecdotes[selected]} votes={pointsArray[selected]} />
            <Button click={handleClick} text={"next anecdote"} />
            <Button click={makeVote} text={"vote"} />
            <Anecdote header={"with most votes"} anecdote={anecdotes[maxVoted]} votes={pointsArray[maxVoted]} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const refresh = () => {
    ReactDOM.render(<App anecdotes={anecdotes} />, 
    document.getElementById('root'))
  }

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)