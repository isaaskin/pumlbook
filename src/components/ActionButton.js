/* eslint-disable react/react-in-jsx-scope */
import { Box, Text } from 'grommet'
import { cloneElement } from 'react'
import PropTypes from 'prop-types'

const ActionButton = ({ icon, label, onClick, color }) => {
  return (
    <Box direction="column"
      focusIndicator={false}
      onClick={onClick}
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
}

ActionButton.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string
}

export default ActionButton
