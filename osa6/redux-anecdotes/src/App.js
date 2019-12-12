import React from 'react';
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'

const App = (props) => {


  return (
    <div>
      <Anecdotes store={props.store}/>
      <NewAnecdote store={props.store}/>
    </div>
  )
}

export default App