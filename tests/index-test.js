import expect from "expect";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { Orchestrator } from "src/";

describe("Component", () => {
  let node;

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it("displays a welcome message", () => {
    render(<Orchestrator children="welcome message" />, node, () => {
      expect(node.innerHTML).toContain("welcome message");
    });
  });
});
