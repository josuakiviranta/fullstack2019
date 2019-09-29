import React from "react";
// import '@testing-library/jest-dom/extend-expect'
//import { render, cleanup } from "@testing-library/react";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import SimpleBlog from "./SimpleBlog";
import { async } from "q";
//import { async } from "q";

// afterEach(cleanup)

test("renders content", () => {
  const simpleBlog = {
    title: "Component testing is done with react-testing-library",
    author: "Josuaki",
    likes: 42
  };

  const component = render(<SimpleBlog blog={simpleBlog} />);

  //component.debug()

  const div = component.container.querySelector("div");
  console.log(prettyDOM(div));

  expect(component.container).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );

  expect(component.container).toHaveTextContent("Josuaki");

  expect(component.container).toHaveTextContent(42);

});

  test("clicking the button twice calls event handler event twice", async () => {
    const simpleBlog = {
      title: "Component testing is done with react-testing-library",
      author: "Josuaki",
      likes: 42
    };

    const mockHandler = jest.fn();

    const { getByText } = render(
      <SimpleBlog blog={SimpleBlog} onClick={mockHandler} />
    );

    const button = getByText("like");
    fireEvent.click(button);
    fireEvent.click(button);


  expect(mockHandler.mock.calls.length).toBe(2)
});

/*
    test("clicking the like button twice adds 2 likes", async () => {
        const simpleBlog = {
            title: "Component testing is done with react-testing-library",
            author: "Josuaki",
            likes: 42
          };

         

          const component = render(<SimpleBlog blog={simpleBlog} />);
          const button = component.getByText("like")

          expect(component.container).toHaveTextContent(42);

          fireEvent.click(button)

          //expect(component.container).toHaveTextContent(43);
    })
*/