import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions

let timeout
export const setTimedNotification = (message, timeoutS) => {
  return (dispatch) => {
    clearTimeout(timeout)
    dispatch(setNotification(message))
    timeout = setTimeout(() => {
      dispatch(setNotification(''))
    }, timeoutS * 1000)
  }
}

export default notificationSlice.reducer
