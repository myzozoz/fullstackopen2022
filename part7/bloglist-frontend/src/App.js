import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import blogService from './services/blogs'
import './index.css'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { setTempMessage } from './reducers/notificationReducer'
import {
  initializeBlogs,
  deleteBlog,
  createNewBlog,
  likeBlog,
} from './reducers/blogReducer'
import {
  loginUser,
  logoutUser,
  setUser,
  fetchAllUsers,
} from './reducers/userReducer'

const Notification = ({ notification }) => (
  <div className={notification.type}>{notification.message}</div>
)

const App = () => {
  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notifications)
  const blogs = useSelector((state) =>
    state.blogs.slice().sort((a, b) => a.likes - b.likes)
  )
  const user = useSelector((state) => state.users.current)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

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

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')

    dispatch(logoutUser())
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    console.log(`submitting new blog ${title}/${author}/${url}`)
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createNewBlog({ title, author, url }))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      dispatch(setTempMessage('Could not create new blog!', 'error', 5000))
    }
  }

  const handleLike = (blog) => async (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleDelete = (blog) => async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  const blogList = () => (
    <>
      <Togglable buttonLabel={'create new'} ref={blogFormRef}>
        <BlogForm
          handleBlogSubmit={handleBlogSubmit}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike(blog)}
            showDelete={
              blog.user && user.username && user.username === blog.user.username
            }
            handleDelete={handleDelete(blog)}
          />
        ))}
    </>
  )

  return (
    <div>
      <h2>blogs</h2>
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
          <button onClick={handleLogout}>logout</button>
          <p>{user.name} logged in</p>
          <Routes>
            <Route path="/" element={blogList()} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
