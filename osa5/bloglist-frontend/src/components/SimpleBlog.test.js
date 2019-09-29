import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const simpleBlog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Josuaki',
    likes: 42
  }

  const component = render(
    <SimpleBlog blog={simpleBlog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  expect(component.container).toHaveTextContent(
      'Josuaki'
  )

  expect(component.container).toHaveTextContent(
      42
  )
})