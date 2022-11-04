import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setTempMessage } from '../reducers/notificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(
        setTempMessage(
          `Successfully logged in! Welcome ${user.name}`,
          'success',
          5000
        )
      )
    } catch (exception) {
      console.log(exception)
      dispatch(
        setTempMessage(
          'Could not log in! Please check username and password.',
          'error',
          5000
        )
      )
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    dispatch(setTempMessage('Logged out', 'success', 5000))
  }
}
export default userSlice.reducer
