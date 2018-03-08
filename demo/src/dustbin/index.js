import React, { Component } from "react"
import { DragSource, DropTarget, Orchestrator } from "../../../src"
import classnames from "classnames"
import "./dustbin.css"

const getBackground = (dragInProgress, draggedOver) =>
  draggedOver ? "green" : dragInProgress ? "yellow" : "black"

function getDragText(dragInProgress, draggedOver) {
  if (draggedOver) {
    return "Release to drop"
  } else {
    return "Drag a box here"
  }
}

class Dustbin extends Component {
  handleDrop = draggingSource => {
    alert("Dropped " + draggingSource)
  }

  render() {
    return (
      <div style={{ padding: 50 }}>
        <Orchestrator>
          <DropTarget onDrop={this.handleDrop}>
            {({ dragInProgress, draggedOver }) => {
              return (
                <div
                  className="dustbin-target"
                  style={{
                    background: getBackground(dragInProgress, draggedOver),
                    color:
                      getBackground(dragInProgress, draggedOver) === "yellow"
                        ? "black"
                        : "white"
                  }}
                >
                  {getDragText(dragInProgress, draggedOver)}
                </div>
              )
            }}
          </DropTarget>
          <div style={{ display: "flex" }}>
            <DragSource data="Banana">
              {({ isDragging }) => (
                <div
                  className={classnames("dustbin-drag-source", {
                    dragging: isDragging
                  })}
                >
                  Banana
                </div>
              )}
            </DragSource>

            <DragSource data="Orange">
              {({ isDragging }) => (
                <div
                  className={classnames("dustbin-drag-source", {
                    dragging: isDragging
                  })}
                >
                  Orange
                </div>
              )}
            </DragSource>

            <DragSource data="Apple">
              {({ isDragging }) => (
                <div
                  className={classnames("dustbin-drag-source", {
                    dragging: isDragging
                  })}
                >
                  Apple
                </div>
              )}
            </DragSource>
          </div>
        </Orchestrator>
      </div>
    )
  }
}

export default Dustbin
