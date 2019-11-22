import React from "react";
import { render, waitForElement } from "@testing-library/react";
jest.mock("./services/blogs");
import { prettyDOM } from "@testing-library/dom";
import App from "./App";
import { async } from "q";
import { exportAllDeclaration, jsxNamespacedName } from "@babel/types";
import blogs from "./services/blogs";

describe("<App />", () => {
  test("if no user logged, blogs are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);
    const loginDiv = component.container.querySelector(".Login");
    await waitForElement(() => component.getByText('login'));

      expect(loginDiv).toBeDefined()
  });

  test("if user logged in blogs will render", async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    const blogsView = component.container.querySelector(".BlogsView")

    expect(blogsView).toBeDefined()

  })

});
