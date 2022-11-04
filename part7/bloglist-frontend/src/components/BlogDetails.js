import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const navigate = useNavigate()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const user = useSelector((state) => state.users.current)
  const showDelete =
    blog.user && user && user.username && user.username === blog.user.username

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
    </>
  )
}

export default BlogDetails
