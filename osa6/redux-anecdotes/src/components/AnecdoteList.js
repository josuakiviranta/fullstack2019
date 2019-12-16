import React from 'react'
import Anecdote from './Anecdote'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notifyVote, hideNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {

    const anecdotesToShow = () => {
        // const { anecdotes, filter } = props.store.getState()
        const show = props.anecdotes.filter(anecdote =>
            anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))
        if (props.filter === '') {
            return props.anecdotes
        }
        return show
    }
    
    const voteAnecdote = (anecdote) => {
        props.store.dispatch(vote(anecdote.id))
        props.store.dispatch(notifyVote(anecdote.content))
        setTimeout(() => {
            props.store.dispatch(hideNotification())
        }, 5000)
    }


    return (
        <ul>
            {anecdotesToShow().map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => 
                        voteAnecdote(anecdote)                
                    }
                    />
                )}
        </ul>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

const ConnectedAnecdotes = connect(mapStateToProps)(Anecdotes)

export default ConnectedAnecdotes