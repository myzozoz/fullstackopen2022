import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: left;
`

const Table = styled.table`
  float: left;
`

const Title = styled.h2`
  margin: 0.3em 0;
`

const Users = () => {
  const users = useSelector((state) => state.users.all)
  return (
    <>
      <Title>Users</Title>
      <Container>
        <Table>
          <thead>
            <tr>
              <th style={{ float: 'left' }}>Name</th>
              <th>Blogs</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default Users
