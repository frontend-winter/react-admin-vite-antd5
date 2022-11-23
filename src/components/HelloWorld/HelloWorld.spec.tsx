import { render, screen } from "@testing-library/react";

import HelloWorld from "./HelloWorld";

describe("HelloWorld", () => {
  it("should renders a msg", () => {
    // arrange
    render(<HelloWorld msg="Hello React!" />);

    // act
    const title = screen.getByTestId("title");

    // assert
    expect(title).toHaveTextContent(/Hello React!/i);
  });
});
