import React from "react";
import renderer from "react-test-renderer";
import Banner from "./index";

test("Nav snapshot ", () => {
  const component = renderer.create(<Banner />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
