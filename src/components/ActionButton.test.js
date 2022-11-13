/* eslint-disable no-undef */
import * as Icons from 'grommet-icons'
import { act } from 'react-dom/test-utils'
import { createRoot } from 'react-dom/client'
import { fireEvent } from '@testing-library/react'
import ActionButton from './ActionButton'
import React from 'react'

let container = null
let root = null

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
})

afterEach(() => {
  // unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('renders', () => {
  act(() => {
    root.render(<ActionButton icon={<Icons.Paint />} label="Test" />)
  })
  expect(container.getElementsByTagName('span')[0].textContent).toBe('Test')
})

it('renders with color', () => {
  act(() => {
    root.render(<ActionButton icon={<Icons.Paint />} label="Test" color="green" />)
  })

  const styles = getComputedStyle(container.getElementsByTagName('span')[0])

  expect(styles.color).toBe('green')
})

it('is clickable', () => {
  let isClicked = false
  const onClick = () => {
    isClicked = true
  }
  act(() => {
    root.render(<ActionButton icon={<Icons.Paint />} label="Test" onClick={onClick} />)
  })

  fireEvent.click(container.getElementsByTagName('span')[0])

  expect(isClicked).toBe(true)
})
