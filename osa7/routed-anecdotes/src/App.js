import React, { useState } from 'react'
import { 
BrowserRouter as Router,
Route, Link, Redirect, withRouter
} from 'react-router-dom'
import Notification from './components/Notification'
import About from './components/About'
import Footer from './components/Footer'
import { hideNotification, setNotification } from './reducers/notificationReducer'


const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }

  const anecdoteById = (id) => 
   props.anecdotes.find(a => Number(a.id) === Number(id))
  

  return (
    <div>
      <Router>
        <div>
            <Link style={padding} to="/anecdotes">anecdotes</Link>
            <Link style={padding} to="/create">create new</Link>
            <Link style={padding} to="/about">about</Link>
        </div>
        <p>{props.notification}</p>
        <div>
          <Route exact path="/" render={() => 
          <AnecdoteList anecdotes={props.anecdotes}/>
          } />
          <Route exact path="/anecdotes" render={() => 
          <AnecdoteList anecdotes={props.anecdotes} />
          } />
          <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={anecdoteById(match.params.id)}/>
          } />
          <Route exact path="/create" render={() => 
            props.notification.length === 0 ?  <CreateNew addNew={props.addNew}/> : <Redirect to="/" />
          } />
          <Route exact path="/about" render={() => 
            <About/>
          } />
        </div>
      </Router>
    </div>
  )

}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return(
    <div>
      <h2> {`${anecdote.content} by ${anecdote.author}`}</h2>
      <div>{`has ${anecdote.votes} votes`}</div>
      <div>{`for more info see ${anecdote.info}`}</div>
    </div>
  )
}


const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
   // setNotification(`you voted '${content}'`, 2)

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}


const App = (props) => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew} anecdoteById={anecdoteById} notification={notification}/>
      <Footer />
    </div>
  )
}

export default App;