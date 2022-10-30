/* eslint-disable react/react-in-jsx-scope */
import { Box, Button, Meter, Stack, Text } from 'grommet'
import { Alarm, Disc, Play, Robot, Vend } from 'grommet-icons'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAutoMode, toggleSideMenu } from '../slices/mainSlice'

import ActionButton from './ActionButton'

import PropTypes from 'prop-types'
import { saveProject } from '../app/helpers'

const Header = ({ onPlayButtonClicked }) => {
  const isSideMenuOpen = useSelector(state => state.main.isSideMenuOpen)
  const isAutoModeEnabled = useSelector(state => state.main.isAutoModeEnabled)
  const percentage = useSelector(state => state.run.percentage)

  const dispatch = useDispatch()

  return (
    <Box background="graph-2"
      height="57px"
      flex={false}
      direction="row"
      justify="between">
      <Box width="small"
        justify="start"
        align="center"
        direction="row"
        gap="small"
      >
        <ActionButton
          icon={<Vend />}
          label="Load"
          onClick={() => dispatch(toggleSideMenu())}
          {...(isSideMenuOpen ? { color: 'yellow' } : {})}
        ></ActionButton>
        <ActionButton
          icon={<Disc />}
          label="Save"
          onClick={() => saveProject('test', 'aasdasdasd')}
        ></ActionButton>
        <ActionButton
          icon={<Robot />}
          label={'Auto'}
          onClick={() => dispatch(toggleAutoMode())}
          {...(isAutoModeEnabled ? { color: 'status-ok' } : {})}
        ></ActionButton>
      </Box>
      <Box width="small"
        justify="center"
        align="center">
        {isAutoModeEnabled
          ? <Stack anchor="center">
            <Box>
              <Meter type="circle"
                size="xxsmall"
                thickness="xxsmall"
                value={percentage} />
            </Box>
            <Box>
              <Alarm />
            </Box>
          </Stack>
          : <Button align="center"
            ustify="center"
            icon={<Play />}
            onClick={onPlayButtonClicked}
          ></Button>
        }
      </Box>
      <Box width="small"
        align="center"
        justify="center">
        <Text>Puml Book</Text>
      </Box>
    </Box>
  )
}

Header.propTypes = {
  onPlayButtonClicked: PropTypes.func
}

export default Header
