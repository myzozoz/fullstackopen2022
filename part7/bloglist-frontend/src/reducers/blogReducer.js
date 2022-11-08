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
    setBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, setBlog, appendBlog, removeBlog } = blogSlice.actions

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

export const createNewComment = (id, comment) => {
  return async (dispatch) => {
    const response = await blogService.createComment({ id, comment })

    dispatch(setBlog(response))
    dispatch(
      setTempMessage(
        `Successfully added comment '${comment}' to ${response.title}`,
        'success',
        5000
      )
    )
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updated = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
      })
      dispatch(setBlog(updated))
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(
        setTempMessage(
          `Successfully removed blog ${blog.title}!`,
          'success',
          5000
        )
      )
    } catch (exception) {
      dispatch(setTempMessage('Could not delete blog', 'error', 5000))
    }
  }
}

export default blogSlice.reducer
