import React from 'react'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifyCreation, hideNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
    const addAnecdote = event => {
      event.preventDefault();
      const content = event.target.anecdote.value;
      event.target.anecdote.value = "";
      
      props.store.dispatch(
        notifyCreation(content)
      )

      setTimeout(() => {
        props.store.dispatch(hideNotification())
    }, 5000)
     
      props.store.dispatch(
      createAnecdote(content)
      );
    };

    return (
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    );
    }
export default NewAnecdote