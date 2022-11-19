import { useState, useImperativeHandle, forwardRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import colors from '../helpers/color'

const Button = styled.button`
  background-color: ${(p) => p.bgColor || 'white'};
  border-color: ${(p) => p.borderColor || 'black'};
  color: ${(p) => p.textColor || 'black'};
  font-weight: bold;
  box-shadow: 0 0 3px ${(p) => p.shadowColor || 'black'};
`

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          bgColor={colors.orangeWeb}
          borderColor={colors.tangerine}
          textColor={colors.jet}
          shadowColor={colors.jet}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
