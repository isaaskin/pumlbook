/* eslint-disable react/react-in-jsx-scope */
import { Alarm, Disc, Download, Play, Robot, Vend } from 'grommet-icons'
import { Box, Button, Drop, Meter, Stack, Text, TextInput } from 'grommet'
import { toggleAutoMode, toggleIsSaveDropOpen, toggleSideMenu } from '../slices/mainSlice'
import { useDispatch, useSelector } from 'react-redux'

import ActionButton from './ActionButton'

import { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { saveAs } from 'file-saver'

const Header = ({ onPlayButtonClicked, onSave }) => {
  const isSideMenuOpen = useSelector(state => state.main.isSideMenuOpen)
  const isAutoModeEnabled = useSelector(state => state.main.isAutoModeEnabled)
  const isSaveDropOpen = useSelector(state => state.main.isSaveDropOpen)
  const percentage = useSelector(state => state.run.percentage)
  const url = useSelector(state => state.run.url)
  const code = useSelector(state => state.run.code)

  const refSaveButton = useRef()

  const [projectName, setProjectName] = useState('')

  const dispatch = useDispatch()

  const onSaveButtonClicked = () => {
    onSave(projectName)
    dispatch(toggleIsSaveDropOpen(false))
    setProjectName('')
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSaveButtonClicked()
    }
  }

  return (
    <Box background="dark-1"
      height="56px"
      flex={false}
      direction="row"
      justify="between">
      <Box width="medium"
        justify="start"
        align="center"
        direction="row"
        gap="medium"
        pad="small"
      >
        <ActionButton
          icon={<Vend />}
          label="Load"
          onClick={() => dispatch(toggleSideMenu())}
          {...(isSideMenuOpen ? { color: 'accent-3' } : {})}
        ></ActionButton>
        <ActionButton
          icon={<Disc />}
          label="Save"
          onClick={() => dispatch(toggleIsSaveDropOpen())}
          {...(isSaveDropOpen ? { color: 'accent-3' } : {})}
          ref={refSaveButton}
        >
        </ActionButton>
        <ActionButton
          icon={<Robot />}
          label={'Auto'}
          onClick={() => dispatch(toggleAutoMode())}
          {...(isAutoModeEnabled ? { color: 'accent-3' } : {})}
        ></ActionButton>
        <ActionButton
          icon={<Download />}
          label={'SVG'}
          onClick={() => {
            fetch(url).then(r => r.text()).then(t => {
              saveAs(new Blob([t], { type: 'image/svg+xml' }), 'chart.svg')
            })
          }}
        ></ActionButton>
        <ActionButton
          icon={<Download />}
          label={'Download'}
          onClick={() => {
            fetch(url).then(r => r.text()).then(t => {
              saveAs(new Blob([code], { type: 'text/plain;charset=utf-8' }), 'code.puml')
            })
          }}
        ></ActionButton>
        {refSaveButton.current && isSaveDropOpen &&
          <Drop
            target={refSaveButton.current}
            align={{ top: 'bottom', left: 'left' }}
            onClickOutside={() => dispatch(toggleIsSaveDropOpen(false))}
            onEsc={() => dispatch(toggleIsSaveDropOpen(false))}
          >
            <Box background="dark-1"
              pad="small"
              gap="small">
              <TextInput
                placeholder="project name"
                value={projectName}
                onChange={event => setProjectName(event.target.value)}
                onKeyDown={onKeyDown}
              />
              <Button label="Save"
                color="accent-3"
                onClick={onSaveButtonClicked}></Button>
            </Box>
          </Drop>
        }
      </Box>
      <Box width="small"
        justify="center"
        align="center"
      >
        {isAutoModeEnabled
          ? <Stack anchor="center">
            <Box>
              <Meter type="circle"
                size="xxsmall"
                thickness="xxsmall"
                value={percentage}
                color="accent-3" />
            </Box>
            <Box>
              <Alarm />
            </Box>
          </Stack>
          : <Button
            icon={<Play />}
            onClick={onPlayButtonClicked}
          ></Button>
        }
      </Box>
      <Box width="medium"
        align="end"
        justify="center"
        pad="small">
        <Text>Puml Book</Text>
        <Text size="small">v{process.env.REACT_APP_VERSION}</Text>
      </Box>
    </Box>
  )
}

Header.propTypes = {
  onPlayButtonClicked: PropTypes.func,
  onSave: PropTypes.func
}

export default Header
