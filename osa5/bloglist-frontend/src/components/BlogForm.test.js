import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm works', () => {
  const newBlog = {
    title: 'Never Not Asding',
    author: 'Asding Asdforever',
    url: 'https://youtube.com',
  }

  test('and calls callback with right details', () => {
    const createNewBlog = jest.fn()

    const { container } = render(<BlogForm createNewBlog={createNewBlog} />)

    userEvent.click(container.querySelector('.blogFormVisibilityButton'))

    const inputs = screen.getAllByRole('textbox')
    const [titleInput, authorInput, urlInput] = inputs
    const submitButton = screen.getByText('Create')

    userEvent.type(titleInput, newBlog.title)
    userEvent.type(authorInput, newBlog.author)
    userEvent.type(urlInput, newBlog.url)

    userEvent.click(submitButton)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0]).toBe(newBlog.title)
    expect(createNewBlog.mock.calls[0][1]).toBe(newBlog.author)
    expect(createNewBlog.mock.calls[0][2]).toBe(newBlog.url)
  })
})
