import React from 'react'
import Anecdote from './Anecdote'

import { vote } from '../reducers/anecdoteReducer'
import { notifyVote, hideNotification } from '../reducers/notificationReducer'

const Anecdotes = ({ store }) => {

    const voteAnecdote = (anecdote) => {
        store.dispatch(vote(anecdote.id))
        store.dispatch(notifyVote(anecdote.content))
        setTimeout(() => {
            store.dispatch(hideNotification())
        }, 5000)
    }

    return (
        <ul>
            {store.getState().anecdotes.map(anecdote =>
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