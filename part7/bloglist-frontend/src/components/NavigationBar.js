import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

const NavBarContainer = styled.div`
  background: lightgrey;
  display: flex;
  text-transform: uppercase;
  justify-content: center;
`
const NavLink = styled(Link)`
  padding: 7px;
  color: black;
  text-decoration: none;
`

const NavLabel = styled.div`
  padding: 7px;
`

const NavButton = styled.button`
  background: darkgrey;
  border: none;
  cursor: pointer;
  margin: 2px;
`

const NavigationBar = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')

    dispatch(logoutUser())
  }
  return (
    <NavBarContainer className="navigation">
      <NavLink className="navigation-item" to="/">
        blogs
      </NavLink>
      <NavLink className="navigation-item" to="/users">
        users
      </NavLink>
      <NavLabel className="navigation-item">{user.name} logged in</NavLabel>
      <NavButton className="navigation-item" onClick={handleLogout}>
        logout
      </NavButton>
    </NavBarContainer>
  )
}

export default NavigationBar
