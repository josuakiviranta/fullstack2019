import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifyCreation, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
      event.preventDefault();
      const content = event.target.anecdote.value;
      event.target.anecdote.value = "";
      props.notifyCreation(content)
      props.createAnecdote(content)
      setTimeout(() => {
        props.hideNotification()
      }, 5000)
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
  notifyCreation,
  hideNotification
}

const ConnectAnecdoteForm = connect(
null,
mapDispatchToProps
)(AnecdoteForm)

export default ConnectAnecdoteForm