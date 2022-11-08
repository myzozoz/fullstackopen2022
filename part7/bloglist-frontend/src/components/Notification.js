import styled from 'styled-components'

const Label = styled.div`
  color: ${(p) => (p.type === 'error' ? 'red' : 'green')};
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`

const Notification = ({ notification }) => (
  <Label type={notification.type}>{notification.message}</Label>
)

export default Notification
