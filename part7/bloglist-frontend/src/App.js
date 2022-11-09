import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import blogService from './services/blogs'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'
import NavigationBar from './components/NavigationBar'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { loginUser, setUser, fetchAllUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'

const Container = styled.div`
  max-width: 650px;
`

const App = () => {
  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notifications)
  const user = useSelector((state) => state.users.current)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <Container>
      {user && <NavigationBar user={user} />}
      <h2>blog app</h2>
      {notification.message && <Notification notification={notification} />}
      {user === null ? (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
        </>
      )}
    </Container>
  )
}

export default App
