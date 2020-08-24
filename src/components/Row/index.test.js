import React from "react";
import renderer from "react-test-renderer";
import Row from "./index";

test("Row snapshot ", () => {
  const component = renderer.create(<Row title="" fetchUrl={""} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
