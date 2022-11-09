/* eslint-disable react/react-in-jsx-scope */
import { Box, Button, Card, CardBody, CardFooter, Text } from 'grommet'
import * as Icons from 'grommet-icons'
import { useDispatch, useSelector } from 'react-redux'
import { loadProjects, removeProject } from '../app/helpers'
import { setCodeToBeLoaded, setSavedData } from '../slices/runSlice'

const SideMenu = (props) => {
  const savedData = useSelector(state => state.run.savedData)
  const dispatch = useDispatch()

  const onCardPlay = (projectName) => {
    dispatch(setCodeToBeLoaded(savedData.find(s => s.name === projectName).code))
  }

  const onCardRemove = (projectName) => {
    removeProject(projectName)
    dispatch(setSavedData(loadProjects()))
  }

  return (
    <Box background="accent-4"
      overflow="auto"
      elevation="small"
      pad="small"
      gap="small"
      fill="vertical"
    >
      {savedData.length === 0
        ? <Box width="xsmall"
          height="100%"
          justify="center">
          <Text textAlign="center">Empty</Text>
        </Box>
        : savedData.map((project, index) => (
          <Card width="small" responsive={false} flex={false} background="light-1" key={index}>
            <CardBody responsive={false} pad="medium">{project.name}</CardBody>
            <CardFooter responsive={false} pad={{ horizontal: 'small' }} background="light-2">
              <Button
                icon={<Icons.Trash color="red" />}
                hoverIndicator
                onClick={() => onCardRemove(project.name)}
              />
              <Button icon={<Icons.Play color="plain" />}
                hoverIndicator
                onClick={() => onCardPlay(project.name)}
              />
            </CardFooter>
          </Card>
        ))}
    </Box>
  )
}

export default SideMenu
