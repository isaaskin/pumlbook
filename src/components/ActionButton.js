/* eslint-disable react/display-name */
/* eslint-disable react/react-in-jsx-scope */
import { Box, Text } from 'grommet'
import { cloneElement, forwardRef } from 'react'
import PropTypes from 'prop-types'

const ActionButton = forwardRef(({ icon, label, onClick, color }, ref) => {
  return (
    <Box direction="column"
      focusIndicator={false}
      onClick={onClick}
      hoverIndicator={{
        color: ''
      }}
      ref={ref}
    >
      <Box align="center" color="yellow">
        {color !== undefined
          ? cloneElement(icon, { color })
          : icon
        }
      </Box>
      <Box>
        <Text {...(color !== undefined ? { color } : {})}>{label}</Text>
      </Box>
    </Box>
  )
})

ActionButton.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string
}

export default ActionButton
