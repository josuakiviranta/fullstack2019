import React from 'react'
import Anecdote from './Anecdote'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notifyVote, hideNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {

    const anecdotesToShow = () => {
        const show = props.anecdotes.filter(anecdote =>
            anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))
        if (props.filter === '') {
            return props.anecdotes
        }
        return show
    }
    
    const handleAnecdoteVote = (anecdote) => {
        props.vote(anecdote.id)
        props.notifyVote(anecdote.content)
        setTimeout(() => {
            props.hideNotification()
        }, 5000)
    }


    return (
        <ul>
            {anecdotesToShow().map(anecdote =>
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
    console.log(state)
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    vote,
    notifyVote,
    hideNotification
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
    )(Anecdotes)

export default ConnectedAnecdotes