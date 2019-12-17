import React from 'react'
import Anecdote from './Anecdote'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { hideNotification, setNotification } from '../reducers/notificationReducer'

const anecdotesToShow = ({ anecdotes, filter }) => {
    const show = anecdotes.filter(anecdote =>
        anecdote.content.toString().toLowerCase().includes(filter.toLowerCase()))
    if (filter === '') {
        return anecdotes
    }
    return show
}

const AnecdoteList = (props) => {   
    const handleAnecdoteVote = (anecdote) => {
        props.vote(anecdote.id)
        props.setNotification(`you voted '${anecdote.content}'`, 5)
    }

    return (
        <ul>
            {props.visibleAnecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => 
                        handleAnecdoteVote(anecdote)                
                    }
                    />
                )}
        </ul>
    )
}


const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state),
    }
}

const mapDispatchToProps = {
    vote,
    hideNotification,
    setNotification
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteList)

export default ConnectedAnecdotes