import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../helpers/color'
import { likeBlog, deleteBlog, createNewComment } from '../reducers/blogReducer'

const BlogCard = styled.div`
  background-color: ${(p) => (p.colors ? p.colors.platinum : 'lightgrey')};
  border-radius: 5px;
  padding: 5px;
  margin: 0 0 10px 0;
  box-shadow: 0 0 3px ${(p) => (p.colors ? p.colors.jet : 'black')};
  color: ${(p) => (p.colors ? p.colors.jet : 'black')};
`

const Title = styled.h2`
  margin: 0.2em 0;
`

const SubTitle = styled.h3`
  margin: 0.2em 0;
`

const LikeButton = styled.button`
  background-color: ${(p) => (p.colors ? p.colors.lightBlue : 'white')};
  border-color: ${(p) => (p.colors ? p.colors.lightSeaGreen : 'black')};
  border-radius: 3px;
  color: ${(p) => (p.colors ? p.colors.jet : 'black')};
  font-weight: bold;
  box-shadow: 0 0 3px ${(p) => (p.colors ? p.colors.jet : 'black')};
`

const InputBox = styled.input`
  flex-grow: 1;
  border-radius: 3px;
`

const SubmitButton = styled.input`
  background-color: ${(p) => (p.colors ? p.colors.lightBlue : 'white')};
  border-color: ${(p) => (p.colors ? p.colors.lightSeaGreen : 'black')};
  border-radius: 3px;
  color: ${(p) => (p.colors ? p.colors.jet : 'black')};
  font-weight: bold;
  box-shadow: 0 0 3px ${(p) => (p.colors ? p.colors.jet : 'black')};
  margin: 5px 0;
  width: 80px;
`

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
`

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
      <BlogCard colors={colors}>
        <Title>{blog.title}</Title>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}{' '}
          <LikeButton
            colors={colors}
            onClick={handleLike(blog)}
            id="likeButton"
          >
            Like!
          </LikeButton>
        </div>
        <div>{blog.user && `added by ${blog.user.name}`}</div>
        {showDelete && <button onClick={handleDelete(blog)}>remove</button>}
      </BlogCard>
      <SubTitle>Comments</SubTitle>
      <CommentForm onSubmit={handleComment(blog)}>
        <InputBox
          colors={colors}
          type="text"
          onChange={(e) => {
            e.preventDefault
            setComment(e.target.value)
          }}
          value={comment}
        />
        <SubmitButton colors={colors} type="submit" value="Submit" />
      </CommentForm>
      <ul>
        {blog.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </>
  )
}

export default BlogDetails
