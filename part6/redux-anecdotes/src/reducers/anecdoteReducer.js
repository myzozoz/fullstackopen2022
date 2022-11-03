import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { setTimedNotification } from '../reducers/notificationReducer'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteFor(state, action) {
      const id = action.payload
      return state.map((a) => (a.id !== id ? a : { ...a, votes: a.votes + 1 }))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { appendAnecdote, voteFor, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(
      setTimedNotification(`created anecdote '${newAnecdote.content}'`, 5)
    )
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(voteFor(anecdote.id))
    dispatch(setTimedNotification(`you voted '${updatedAnecdote.content}'`, 5))
  }
}

export default anecdoteSlice.reducer
