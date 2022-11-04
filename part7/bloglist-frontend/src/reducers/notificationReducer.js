import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: '',
}

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

let timeoutId
export const setTempMessage = (message, type, timeout) => {
  return (dispatch) => {
    dispatch(setNotification({ message, type }))
    clearTimeout(timeoutId)
    timeoutId = setTimeout(
      () => dispatch(setNotification({ message: '', type: '' })),
      timeout
    )
  }
}

export default notificationSlice.reducer
