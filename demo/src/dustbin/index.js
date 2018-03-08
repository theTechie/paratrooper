import React, { Component } from "react"
import { DragSource, DropTarget, Orchestrator } from "../../../src"
import classnames from "classnames"
import "./dustbin.css"

const getBackground = (dragInProgress, isDraggedOver) =>
  isDraggedOver ? "green" : dragInProgress ? "yellow" : "black"

function getDragText(dragInProgress, isDraggedOver) {
  if (isDraggedOver) {
    return "Release to drop"
  } else {
    return "Drag a box here"
  }
}

class Dustbin extends Component {
  handleDrop = draggingSource => {
    alert("Dropped " + draggingSource.data)
  }

  render() {
    return (
      <div style={{ padding: 50 }}>
        <Orchestrator>
          <DropTarget onDrop={this.handleDrop}>
            {({ dragInProgress, isDraggedOver }) => {
              return (
                <div
                  className="dustbin-target"
                  style={{
                    background: getBackground(dragInProgress, isDraggedOver),
                    color:
                      getBackground(dragInProgress, isDraggedOver) === "yellow"
                        ? "black"
                        : "white"
                  }}
                >
                  {getDragText(dragInProgress, isDraggedOver)}
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
