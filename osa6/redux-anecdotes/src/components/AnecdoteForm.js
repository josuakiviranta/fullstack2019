import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { hideNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
      event.preventDefault();
      const content = event.target.anecdote.value;
      event.target.anecdote.value = "";
      props.setNotification(`New anecdote '${content}'`, 5)
      props.createAnecdote(content)
    };

    return (
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    );
    }

const mapDispatchToProps = {
  createAnecdote,
  hideNotification,
  setNotification
}

const ConnectAnecdoteForm = connect(
null,
mapDispatchToProps
)(AnecdoteForm)

export default ConnectAnecdoteForm