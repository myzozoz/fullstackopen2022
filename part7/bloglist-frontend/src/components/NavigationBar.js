import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import colors from '../helpers/color'

const NavBarContainer = styled.div`
  background: ${(p) => p.bgColor || 'lightgrey'};
  box-shadow: 0 1px 3px ${(p) => p.shadowColor || 'black'};
`

const HorizontalLimit = styled.div`
  max-width: 800px;
  margin: auto;
  display: flex;
`

const Divider = styled.div`
  margin: 5px 0;
  width: 1px;
  background-color: black;
`

const NavLink = styled(Link)`
  padding: 7px;
  color: black;
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;
`
const LogoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`

const NameLabel = styled.div`
  padding: 7px;
  text-transform: uppercase;
`

const LoggedInText = styled.div`
  margin: auto 0;
  padding-right: 3px;
`

const LogoutButton = styled.button`
  background: ${(p) => p.bgColor || 'lightgrey'};
  border: none;
  cursor: pointer;
  margin: 6px;
`

const NavigationBar = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')

    dispatch(logoutUser())
  }
  return (
    <NavBarContainer
      className="navigation"
      bgColor={colors.lightSeaGreen}
      shadowColor={colors.jet}
    >
      <HorizontalLimit>
        <Divider />
        <NavLink className="navigation-item" to="/">
          blogs
        </NavLink>
        <Divider />
        <NavLink className="navigation-item" to="/users">
          users
        </NavLink>
        <LogoutContainer>
          <NameLabel className="navigation-item">{user.name + ' '}</NameLabel>
          <LoggedInText>logged in</LoggedInText>
          <LogoutButton
            className="navigation-item"
            onClick={handleLogout}
            bgColor={colors.orangeWeb}
          >
            {'Logout ->'}
          </LogoutButton>
        </LogoutContainer>
      </HorizontalLimit>
    </NavBarContainer>
  )
}

export default NavigationBar
