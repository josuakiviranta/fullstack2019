import React from "react";
// import '@testing-library/jest-dom/extend-expect'
//import { render, cleanup } from "@testing-library/react";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

// afterEach(cleanup)

test("at start the children are not displayed", () => {
  const blog = {
    title: "Component",
    author: "Josuaki",
    url: "josun_blogi.fi",
    likes: 42
  };
  const component = render(<Blog blog={blog} />);
  const div = component.container.querySelector(".togglableContent");
  console.log(prettyDOM(div));
  console.log("---------------------------------");

  expect(div).toHaveStyle("display: none");
});

test("after clicking the button, children are displayed", () => {
  const blog = {
    title: "Component",
    author: "Josuaki",
    url: "josun_blogi.fi",
    likes: 42
  };
  const component = render(<Blog blog={blog} />);
  const title = component.container.querySelector(".title");
  console.log(prettyDOM(title))
  fireEvent.click(title);
  const div = component.container.querySelector(".togglableContent");
  expect(div).toHaveStyle("display: ");
});
