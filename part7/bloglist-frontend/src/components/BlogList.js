import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { createNewBlog } from '../reducers/blogReducer'
import { setTempMessage } from '../reducers/notificationReducer'

const BlogList = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogs = useSelector((state) => state.blogs.slice())

  const blogFormRef = useRef()
  const dispatch = useDispatch()

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
  return (
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
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  )
}

export default BlogList
