import Row from "../Row.js";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import React from "react";
import "@testing-library/jest-dom";

import { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

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
