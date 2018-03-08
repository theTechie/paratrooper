import React, { Component } from "react";
import { DragSource, DropTarget, Orchestrator } from "../../../src";
import "./chess_board.css";

const chessBoard = Array(8).fill(Array(8).fill(0));

function getBackground(rowIndex, colIndex, draggingSource) {
  if (draggingSource) {
    const { position } = draggingSource;

    if (
      position &&
      Math.abs(rowIndex - position[0]) + Math.abs(colIndex - position[1]) ===
        3 &&
      Math.abs(rowIndex - position[0]) <= 2 &&
      Math.abs(colIndex - position[1]) <= 2
    ) {
      return "hotpink";
    }
  }

  return (rowIndex + colIndex) % 2 !== 0 ? "black" : "white";
}

class ChessBoard extends Component {
  state = {
    pawnPosition: [0, 0]
  };

  handleDrop = (rowIndex, colIndex, draggingSource) => {
    this.setState({ pawnPosition: [rowIndex, colIndex] });
  };

  render() {
    const { pawnPosition } = this.state;
    return (
      <Orchestrator>
        <div>
          <h4>Chess Example</h4>
          <DropTarget onDrop={() => {}}>
            {({ dragInProgress, draggingSource, draggedOver }) => {
              if (dragInProgress) {
                return (
                  <div>
                    Dragged pawn position - {draggingSource.position[0]},{" "}
                    {draggingSource.position[1]}
                    , {draggedOver && draggedOver.data.position[0]},{" "}
                    {draggedOver && draggedOver.data.position[1]}
                  </div>
                );
              } else {
                return <div>Nothing being dragged</div>;
              }
            }}
          </DropTarget>
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
                    );
                  } else {
                    return (
                      <DropTarget
                        onDrop={this.handleDrop.bind(this, rowIndex, colIndex)}
                        data={{
                          position: [rowIndex, colIndex]
                        }}
                      >
                        {({ dragInProgress, draggedOver, draggingSource }) => {
                          return (
                            <div
                              className="chess-board-cell"
                              style={{
                                background: getBackground(
                                  rowIndex,
                                  colIndex,
                                  dragInProgress && draggingSource
                                )
                              }}
                            />
                          );
                        }}
                      </DropTarget>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </Orchestrator>
    );
  }
}

export default ChessBoard;
