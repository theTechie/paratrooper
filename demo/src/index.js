import React, { Component } from "react";
import { render } from "react-dom";

import { DragSource, DropTarget, Orchestrator } from "../../src";

import Dustbin from "./dustbin";
import ChessBoard from "./chess";

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>Paratrooper Demo</h1>
        <Dustbin />
        <ChessBoard />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
