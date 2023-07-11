import Row from "../components/Row.js";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockStore = configureStore([]);
const store = mockStore({ filmsList: [] });
const queryClient = new QueryClient();

const wrapper = shallow(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Row />
    </QueryClientProvider>
  </Provider>
);

describe("Row component connected to Redux", () => {
  it("should exists", () => {
    expect(wrapper).not.toBeNull();
  });
});
