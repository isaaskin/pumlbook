/* eslint-disable react/react-in-jsx-scope */
import { Box, Image } from 'grommet'
import { useSelector } from 'react-redux'

const Output = (props) => {
  const url = useSelector(state => state.run.url)

  return (
    <Box overflow="auto">
      <Image src={url}></Image>
    </Box>
  )
}

export default Output
