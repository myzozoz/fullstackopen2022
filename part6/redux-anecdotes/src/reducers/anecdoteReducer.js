import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'
import { setTimedMessage } from '../helpers/timedNotification'

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
    setTimedMessage(
      (message) => dispatch(setNotification(message)),
      `created anecdote '${newAnecdote.content}'`,
      5000
    )
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(voteFor(anecdote.id))
    setTimedMessage(
      (message) => dispatch(setNotification(message)),
      `you voted '${updatedAnecdote.content}'`,
      5000
    )
  }
}

export default anecdoteSlice.reducer
