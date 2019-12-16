import React from 'react';
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter';

const App = (props) => {


  return (
    <div>
      <Notification store={props.store}/>
      <h1>Anecdotes</h1>
      <Filter store={props.store}/>
      <Anecdotes store={props.store}/>
      <NewAnecdote store={props.store}/>
    </div>
  )
}

export default App