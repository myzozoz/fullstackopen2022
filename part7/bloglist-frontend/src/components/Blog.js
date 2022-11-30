import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import colors from '../helpers/color'

const LinkCard = styled(Link)`
  padding: 6px 4px;
  border-radius: 3px;
  margin-bottom: 10px;
  box-shadow: 0 0 3px ${(p) => (p.colors ? p.colors.jet : 'black')};
  cursor: pointer;
  background-color: ${(p) => (p.colors ? p.colors.platinum : 'lightgrey')};
  text-decoration: none;
`

const Title = styled.span`
  color: ${(p) => (p.colors ? p.colors.jet : 'black')};
  text-transform: uppercase;
`

const Author = styled.span`
  color: ${(p) => (p.colors ? p.colors.jet : 'black')};
`

const Blog = ({ blog }) => {
  return (
    <LinkCard
      id="blog"
      className={'blog-class'}
      to={`/blogs/${blog.id}`}
      colors={colors}
    >
      <Title colors={colors}>{blog.title}</Title>
      <Author colors={colors}> - {blog.author}</Author>
    </LinkCard>
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
