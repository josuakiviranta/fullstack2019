import React from 'react';

const App = (props) => {
  const anecdotes = props.store.getState()
  const store = props.store

  const getId = () => (100000 * Math.random()).toFixed(0)

  const vote = (id) => {
    console.log('vote', id)
    store.dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content,
        id: getId(),
        votes: 0
      }
    })
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App