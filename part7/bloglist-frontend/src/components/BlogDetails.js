import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { likeBlog, deleteBlog, createNewComment } from '../reducers/blogReducer'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const navigate = useNavigate()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const user = useSelector((state) => state.users.current)
  const [comment, setComment] = useState('')

  if (!blog) return null

  const showDelete = user && blog.user && user.username === blog.user.username

  const handleLike = (blog) => async (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleDelete = (blog) => async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  const handleComment = (blog) => async (event) => {
    console.log('commenting on blog', blog)
    event.preventDefault()
    dispatch(createNewComment(blog.id, comment))
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}{' '}
        <button onClick={handleLike(blog)} id="likeButton">
          like
        </button>
      </div>
      <div>{blog.user && `added by ${blog.user.name}`}</div>
      {showDelete && <button onClick={handleDelete(blog)}>remove</button>}
      <h3>comments</h3>
      <form onSubmit={handleComment(blog)}>
        <input
          type="text"
          onChange={(e) => {
            e.preventDefault
            setComment(e.target.value)
          }}
          value={comment}
        />
        <input type="submit" value="submit" />
      </form>
      <ul>
        {blog.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </>
  )
}

export default BlogDetails
