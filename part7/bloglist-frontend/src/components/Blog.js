import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    cursor: 'pointer',
  }

  return (
    <div style={blogStyle}>
      <Link id="blog" className={'blog-class'} to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
}

export default Blog
