import React from "react";
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> events controller is called', async () => {
    const handleAddBlog = jest.fn()
    const handleTitleChange = jest.fn()
    const handleAuthorChange = jest.fn()
    const handleUrlChange = jest.fn()
  
    const component = render(
      <BlogForm handleAddBlog={handleAddBlog} handleTitleChange={handleTitleChange}
      handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange}
       />
    )
  
    //const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
  
    fireEvent.change(title, {
      target: { value: 'testing of form with controllers' }
    })

    /* await waitFor(() => {
      console.log('BlogForm title after: ', title.value);
    }) */

    fireEvent.change(author, {
      target: { value: 'Brandon' }
    })

    fireEvent.change(url, {
      target: { value: 'www.testing.com' }
    })

    fireEvent.submit(form)
  
    //console.log('BlogForm', title.value);
    expect(title.value).toBe('testing of form with controllers')
    //expect(createNote.mock.calls).toHaveLength(1)
    //expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier')
  })