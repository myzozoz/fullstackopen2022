import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../helpers/color'

const Title = styled.h3`
  margin: 1em 0 0.2em 0;
`

const Form = styled.form`
  background-color: ${(p) => (p.colors ? p.colors.platinum : 'lightgrey')};
  border-radius: 5px;
  padding: 5px;
  margin: 0 0 10px 0;
  box-shadow: 0 0 3px ${(p) => (p.colors ? p.colors.jet : 'black')};
`

const InputRow = styled.div`
  padding: 3px 0;
  display: flex;
  flex-direction: row;
  color: ${(p) => (p.colors ? p.colors.jet : 'black')};
`

const InputTitle = styled.span`
  width: 80px;
  font-weight: bold;
`

const InputBox = styled.input`
  flex-grow: 1;
  border-radius: 3px;
`

const SubmitButton = styled.button`
  background-color: ${(p) => (p.colors ? p.colors.lightBlue : 'white')};
  border-color: ${(p) => (p.colors ? p.colors.lightSeaGreen : 'black')};
  border-radius: 3px;
  color: ${(p) => (p.colors ? p.colors.jet : 'black')};
  font-weight: bold;
  box-shadow: 0 0 3px ${(p) => (p.colors ? p.colors.jet : 'black')};
`

const BlogForm = ({
  handleBlogSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
}) => {
  return (
    <>
      <Title>Create new</Title>
      <Form onSubmit={handleBlogSubmit} colors={colors}>
        <InputRow colors={colors}>
          <InputTitle>Title:</InputTitle>
          <InputBox
            type="text"
            id="title"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </InputRow>
        <InputRow colors={colors}>
          <InputTitle>Author:</InputTitle>
          <InputBox
            type="text"
            id="author"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </InputRow>
        <InputRow colors={colors}>
          <InputTitle>URL:</InputTitle>
          <InputBox
            type="text"
            value={url}
            id="url"
            name="Url"
            onChange={handleUrlChange}
          />
        </InputRow>
        <SubmitButton colors={colors} type="submit">
          Submit
        </SubmitButton>
      </Form>
    </>
  )
}

BlogForm.propTypes = {
  handleBlogSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default BlogForm
