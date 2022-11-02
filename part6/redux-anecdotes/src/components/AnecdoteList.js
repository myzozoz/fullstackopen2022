import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setTimedMessage } from '../helpers/timedNotification'

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filters)
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .slice()
      .filter((a) => a.content.toLowerCase().includes(filter))
      .sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
    setTimedMessage(
      (message) => dispatch(setNotification(message)),
      `you voted '${anecdotes.find((a) => a.id === id).content}'`,
      5000
    )
  }
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
