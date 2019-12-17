import React from 'react'
import Anecdote from './Anecdote'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notifyVote, hideNotification } from '../reducers/notificationReducer'

const anecdotesToShow = ({ anecdotes, filter }) => {
    anecdotes.forEach(a => console.log("ANECDOTES TO SHOW: ", a.content.toString().toLowerCase()))
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
        props.notifyVote(anecdote.content)
        setTimeout(() => {
            props.hideNotification()
        }, 5000)
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
    notifyVote,
    hideNotification
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteList)

export default ConnectedAnecdotes