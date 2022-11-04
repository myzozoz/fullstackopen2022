import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setTempMessage } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.create(blog)
    dispatch(appendBlog(response))
    dispatch(
      setTempMessage(
        `Successfully added new blog (${response.title} by ${response.author})`,
        'success',
        5000
      )
    )
  }
}

export default blogSlice.reducer
