import React, { Component } from "react"
import { render } from "react-dom"

import { DragSource, DropTarget, Orchestrator } from "../../src"

import Dustbin from "./dustbin"
import ChessBoard from "./chess"
import SimpleSortableList from "./sortable/simple/index.js"

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>Paratrooper Demos</h1>
        <SimpleSortableList />
        <ChessBoard />
        <Dustbin />
      </div>
    )
  }
}

render(<Demo />, document.querySelector("#demo"))
