import Row from "../components/Row.js";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import React from "react";
import "@testing-library/jest-dom";

import { shallow } from "enzyme";

const mockStore = configureStore([]);
const store = mockStore({ filmsList: [] });

const wrapper = shallow(
  <Provider store={store}>
    <Row />
  </Provider>
);

describe("Row component connected to Redux", () => {
  it("should exists", () => {
    expect(wrapper).not.toBeNull();
  }, 1000);
});
