import Row from "../components/Row.js";
import { render, cleanup, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import React from "react";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);
const store = mockStore({ filmsList: [] });

afterEach(() => {
  cleanup();
});

describe("Row component connected to Redux", () => {
  render(
    <Provider store={store}>
      <Row />
    </Provider>
  );
  const rowComponent = screen.getByTestId("rowComponent");

  // Method used = test(name, fn, timeout)
  it("should exists", () => {
    expect(rowComponent).not.toBeNull();
  }, 1000);
});
