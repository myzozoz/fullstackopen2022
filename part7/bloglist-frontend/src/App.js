import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { setTempMessage } from './reducers/notificationReducer'
import {
  initializeBlogs,
  deleteBlog,
  createNewBlog,
  likeBlog,
} from './reducers/blogReducer'

const Notification = ({ notification }) => (
  <div className={notification.type}>{notification.message}</div>
)

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notifications)
  const blogs = useSelector((state) =>
    state.blogs.slice().sort((a, b) => a.likes - b.likes)
  )
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
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

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    dispatch(setTempMessage('Logged out', 'success', 5000))
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
      <p>{user.name} logged in</p>
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
          {blogList()}
        </>
      )}
    </div>
  )
}

export default App
