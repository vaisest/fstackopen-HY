import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('with preset content Blog', () => {
  const blog = {
    title: 'Never Not Asding',
    author: 'Asding Asdforever',
    url: 'https://youtube.com',
    user: {
      username: 'asder',
      name: 'asderman asdington',
      id: '625d92e83534c0dc6762e186',
      token: '???',
    },
    likes: 222,
    id: '625d92e83534c0dc6762e185',
  }

  const blogs = [blog]
  const user = {
    token: '???',
    username: 'asder',
    name: 'asderman asdington',
    id: '625d92e83534c0dc6762e186',
  }

  test('renders content but not hidden content', () => {
    const setBlogs = jest.fn()
    const flashMessage = jest.fn()

    const { container } = render(
      <Blog
        blog={blog}
        blogs={blogs}
        user={user}
        setBlogs={setBlogs}
        flashMessage={flashMessage}
      />
    )

    const div = container.querySelector('.blog')

    expect(div).toBeDefined()
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent('View')
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.user.name)
    expect(div).not.toHaveTextContent('Likes')
  })

  test('renders hidden content when button has been pressed', () => {
    const setBlogs = jest.fn()
    const flashMessage = jest.fn()

    const { container } = render(
      <Blog
        blog={blog}
        blogs={blogs}
        user={user}
        setBlogs={setBlogs}
        flashMessage={flashMessage}
      />
    )

    const div = container.querySelector('.blog')
    const button = div.querySelector('.viewButton')
    userEvent.click(button)

    expect(div).toHaveTextContent('Hide')
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent('Likes')
    expect(div).toHaveTextContent(blog.likes)
    expect(div.querySelector('.deleteButton')).toBeDefined()
  })

  test('doesn\'t render hidden content when button is pressed twice', () => {
    const setBlogs = jest.fn()
    const flashMessage = jest.fn()

    const { container } = render(
      <Blog
        blog={blog}
        blogs={blogs}
        user={user}
        setBlogs={setBlogs}
        flashMessage={flashMessage}
      />
    )

    const div = container.querySelector('.blog')
    const button = div.querySelector('.viewButton')
    userEvent.click(button)
    userEvent.click(button)

    expect(div).toHaveTextContent('View')

    expect(div).not.toHaveTextContent('Hide')
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent('Likes')
    expect(div).not.toHaveTextContent(blog.likes)

    expect(div.querySelector('.deleteButton')).toBeNull()
  })
})
