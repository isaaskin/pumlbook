/* eslint-disable react/react-in-jsx-scope */
import { Box, Button, Card, CardBody, CardFooter } from 'grommet'
import { loadProjects } from '../app/helpers'
import * as Icons from 'grommet-icons'

const SideMenu = (props) => {
  return (
    <Box background="grey"
      overflow="auto"
      elevation="small"
      pad="small"
      gap="small"
      fill="vertical"
    >
      {loadProjects().map((project, index) => (
        <Card width="small" responsive={false} flex={false} background="light-1" key={index}>
          <CardBody responsive={false} pad="medium">{project.name}</CardBody>
          <CardFooter responsive={false} pad={{ horizontal: 'small' }} background="light-2">
            <Button
              icon={<Icons.Favorite color="red" />}
              hoverIndicator
            />
            <Button icon={<Icons.ShareOption color="plain" />} hoverIndicator />
          </CardFooter>
        </Card>
      ))}
    </Box>
  )
}

export default SideMenu
