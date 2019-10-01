import React from "react";
import { render, waitForElement } from "@testing-library/react";
jest.mock("./services/blogs");
import { prettyDOM } from "@testing-library/dom";
import App from "./App";
import { async } from "q";
import { exportAllDeclaration } from "@babel/types";

describe("<App />", () => {
  test("if no user logged, blogs are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    const div = component.container.querySelector('div');
    //console.log('-------------------------------------')
    //console.log(prettyDOM(div));
    await waitForElement(() => component.getByText('login'));

    expect(div).toHaveTextContent('login');
    expect(div).not.toHaveTextContent('blogs')
  });

  /*
  test('renders all notes it gets from backend', async () => {
    const component = render(
      <App />
    )

    const div = component.container.querySelector('div');
    console.log(prettyDOM(div));

    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    const notes = component.container.querySelectorAll('.blog')
    expect(notes.length).toBe(3) 

    expect(component.container).toHaveTextContent(
      'HTML is easy'
    )
    expect(component.container).toHaveTextContent(
      'Browser can execute only javascript'
    )
    expect(component.container).toHaveTextContent(
      'The most important methods of HTTP are GET and POST'
    )
  })
  */
});
