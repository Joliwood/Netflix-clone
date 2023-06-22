import Row from "../Row.js";
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

describe("Button Component", () => {
  render(
    <Provider store={store}>
      <Row />
    </Provider>
  );
  const rowComponent = screen.getByTestId("rowComponent");

  test("add film to the list", () => {
    expect(rowComponent).not.toBeNull();
  });
});
