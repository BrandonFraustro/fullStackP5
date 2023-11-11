import React from "react";
import '@testing-library/jest-dom';
import { render } from '@testing-library/react'
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