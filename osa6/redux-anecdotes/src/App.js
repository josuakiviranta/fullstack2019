import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter';

const App = (props) => {


  return (
    <div>
      <Notification/>
      <h1>Anecdotes</h1>
      <Filter />
      <Anecdotes />
      <AnecdoteForm/>
    </div>
  )
}

export default App