import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import colors from '../helpers/color'

const NavBarContainer = styled.div`
  background: ${(p) => (p.colors ? p.colors.jet : 'black')};
  box-shadow: 0 1px 3px ${(p) => (p.colors ? p.colors.jet : 'black')};
`

const HorizontalLimit = styled.div`
  max-width: 800px;
  margin: auto;
  display: flex;
`

const Divider = styled.div`
  margin: 5px 0;
  width: 1px;
  background-color: ${(p) => (p.colors ? p.colors.platinum : 'white')};
`

const NavLink = styled(Link)`
  padding: 7px;
  color: ${(p) => (p.colors ? p.colors.platinum : 'white')};
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;
`
const LogoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  color: ${(p) => (p.colors ? p.colors.platinum : 'white')};
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
  background-color: ${(p) => (p.colors ? p.colors.orangeWeb : 'white')};
  border-color: ${(p) => (p.colors ? p.colors.tangerine : 'black')};
  border-radius: 3px;
  color: ${(p) => (p.colors ? p.colors.jet : 'black')};
  font-weight: bold;
  box-shadow: 0 0 3px ${(p) => (p.colors ? p.colors.jet : 'black')};
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
    <NavBarContainer className="navigation" colors={colors}>
      <HorizontalLimit>
        <Divider />
        <NavLink colors={colors} to="/">
          blogs
        </NavLink>
        <Divider />
        <NavLink colors={colors} to="/users">
          users
        </NavLink>
        <LogoutContainer colors={colors}>
          <NameLabel>{user.name + ' '}</NameLabel>
          <LoggedInText>logged in</LoggedInText>
          <LogoutButton
            className="navigation-item"
            onClick={handleLogout}
            colors={colors}
          >
            {'Logout ->'}
          </LogoutButton>
        </LogoutContainer>
      </HorizontalLimit>
    </NavBarContainer>
  )
}

export default NavigationBar
