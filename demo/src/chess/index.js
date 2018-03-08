import React, { Component } from "react"
import { DragSource, DropTarget, Orchestrator } from "../../../src"
import "./chess_board.css"

const chessBoard = Array(8).fill(Array(8).fill(0))

function canDrop(rowIndex, colIndex, pawnPosition) {
  return (
    pawnPosition &&
    Math.abs(rowIndex - pawnPosition[0]) +
      Math.abs(colIndex - pawnPosition[1]) ===
      3 &&
    Math.abs(rowIndex - pawnPosition[0]) <= 2 &&
    Math.abs(colIndex - pawnPosition[1]) <= 2
  )
}

function getBackground(
  rowIndex,
  colIndex,
  dragInProgress,
  draggingSource,
  draggedOver
) {
  if (dragInProgress) {
    const { position } = draggingSource

    if (canDrop(rowIndex, colIndex, position)) {
      return draggedOver && draggedOver.overMe ? "green" : "yellow"
    } else if (draggedOver && draggedOver.overMe) {
      return "red"
    }
  }

  return (rowIndex + colIndex) % 2 !== 0 ? "black" : "white"
}

class ChessBoard extends Component {
  state = {
    pawnPosition: [0, 0]
  }

  handleDrop = (rowIndex, colIndex, draggingSource) => {
    if (canDrop(rowIndex, colIndex, draggingSource.position)) {
      this.setState({ pawnPosition: [rowIndex, colIndex] })
    }
  }

  render() {
    const { pawnPosition } = this.state
    return (
      <Orchestrator>
        <div>
          <h2>Chess Example</h2>
          <DropTarget onDrop={() => {}}>
            {({ dragInProgress, draggingSource, draggedOver }) => {
              if (dragInProgress) {
                return (
                  <div style={{ marginBottom: 10 }}>
                    <div>
                      Position of pawn being dragged:{" "}
                      {draggingSource.position[0]}, {draggingSource.position[1]}
                    </div>
                    <div>
                      Position of dragged over cell:{" "}
                      {draggedOver && draggedOver.data.position[0]},{" "}
                      {draggedOver && draggedOver.data.position[1]}
                    </div>
                  </div>
                )
              } else {
                return <div>Nothing being dragged</div>
              }
            }}
          </DropTarget>
          <div className="chess-board-container">
            {chessBoard.map((row, rowIndex) => {
              return (
                <div className="chess-board-row">
                  {row.map((x, colIndex) => {
                    if (
                      rowIndex === pawnPosition[0] &&
                      colIndex === pawnPosition[1]
                    ) {
                      return (
                        <DragSource
                          data={{
                            position: pawnPosition
                          }}
                          key={"drag_source_" + rowIndex + "_" + colIndex}
                        >
                          {({ isDragging }) => (
                            <div
                              className="chess-board-cell"
                              style={{
                                background: "green"
                              }}
                            />
                          )}
                        </DragSource>
                      )
                    } else {
                      return (
                        <DropTarget
                          onDrop={this.handleDrop.bind(
                            this,
                            rowIndex,
                            colIndex
                          )}
                          data={{
                            position: [rowIndex, colIndex]
                          }}
                        >
                          {({
                            dragInProgress,
                            draggedOver,
                            draggingSource
                          }) => {
                            return (
                              <div
                                className="chess-board-cell"
                                style={{
                                  background: getBackground(
                                    rowIndex,
                                    colIndex,
                                    dragInProgress,
                                    draggingSource,
                                    draggedOver
                                  )
                                }}
                              />
                            )
                          }}
                        </DropTarget>
                      )
                    }
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </Orchestrator>
    )
  }
}

export default ChessBoard
