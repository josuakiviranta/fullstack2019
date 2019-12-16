import React from 'react'
import Anecdote from './Anecdote'

import { vote } from '../reducers/anecdoteReducer'
import { notifyVote, hideNotification } from '../reducers/notificationReducer'

const Anecdotes = ({ store }) => {

    const anecdotesToShow = () => {
        const { anecdotes, filter } = store.getState()
        const show = anecdotes.filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        if (filter === '') {
            return anecdotes
        }
        return show
    }
    
    const voteAnecdote = (anecdote) => {
        store.dispatch(vote(anecdote.id))
        store.dispatch(notifyVote(anecdote.content))
        setTimeout(() => {
            store.dispatch(hideNotification())
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

export default Anecdotes