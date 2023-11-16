import React from "react";
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react'
import { prettyDOM } from "@testing-library/react";
import Blog from "./Blog";

test('test: a blog with title and author', () => {
  const blogTest = {
    title: 'Component testing with react',
    author: 'Brandon',
    url: 'testing.com',
    likes: 6
  }

  const component = render(
    <Blog blog={blogTest} />
  )

  //component.debug()

  const div = component.container.querySelector('.blog-test')
  //console.log(prettyDOM(div))

  expect(div).toHaveTextContent('Component testing with react');
  expect(div).toHaveTextContent('Brandon');

  expect(div).not.toHaveTextContent('testing.com');
  expect(div).not.toHaveTextContent('6');
})

describe('<Blog />', () => {
  test('renders title, author, url and likes before click the button', () => {
    const blogTest = {
      title: 'Component testing with react',
      author: 'Brandon',
      url: 'testing.com',
      likes: 6
    }
    const mockHandlerUpdate = jest.fn()
    const mockHandlerDelete = jest.fn()
  
    const component = render(
      <Blog blog={blogTest} handleUpdatedBlog={mockHandlerUpdate} handleDeletedBlogs={mockHandlerDelete}/>
    )
  
    const button = component.container.querySelector('.button-blog')
    fireEvent.click(button)
    
    expect(component.container).toHaveTextContent('Component testing with react')
    expect(component.container).toHaveTextContent('Brandon')
    expect(component.container).toHaveTextContent('testing.com')
    expect(component.container).toHaveTextContent('6')
  })

  test('verifying if the button like is clicked', async () => {
    const blogTest = {
      title: 'Component testing with react',
      author: 'Brandon',
      url: 'testing.com',
      likes: 6
    }
    const mockHandlerUpdate = jest.fn()
    //console.log('MockHandlerUpdate', mockHandlerUpdate.mock);
    //const mockHandlerDelete = jest.fn()
  
    const component = render(
      <Blog blog={blogTest} handleUpdatedBlog={mockHandlerUpdate}/>
    )
  
    const button = component.getByText('Like')
    //console.log('Button', button);
    fireEvent.click(button)
    fireEvent.click(button)

    //console.log('MockHandlerDelete', mockHandlerDelete.mock.calls);
    await waitFor(() => {
      expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
    })
  })
})
