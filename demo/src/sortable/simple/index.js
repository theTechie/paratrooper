import React, { Component } from "react"
import { DragSource, DropTarget, Orchestrator } from "../../../../src/index.js"
import "./simple_sortable_list.css"

const items = [
  "Make it generic enough",
  "Write README",
  "Create some examples",
  "Span in Twitter and IRC to promote it (note that this element is taller than others",
  "???",
  "Write a cool JS library",
  "PROFIT"
]

class SortableItem extends Component {
  render() {
    const { item, onDragOver, onDrop } = this.props

    return (
      <DropTarget data={item} onDragOver={onDragOver} onDrop={onDrop}>
        {({ dragInProgress, draggedOver, draggingSource }) => {
          return (
            <DragSource data={item}>
              {({ isDragging }) => {
                return (
                  <div
                    className="sortable-item"
                    style={{ opacity: isDragging ? 0.4 : 1.0 }}
                  >
                    {item}
                  </div>
                )
              }}
            </DragSource>
          )
        }}
      </DropTarget>
    )
  }
}

class SimpleSortableList extends Component {
  state = { items: items }

  handleDragOver = (item, draggedOver) => {
    if (draggedOver) {
      const { items } = this.state
      const indexOfDraggedOver = items.indexOf(draggedOver.data)
      const indexOfDraggingSource = items.indexOf(
        draggedOver.draggingSource.data
      )

      items.splice(indexOfDraggingSource, 1, draggedOver.data)
      items.splice(indexOfDraggedOver, 1, draggedOver.draggingSource.data)
      this.setState({ items })
    }
  }

  handleDrop = (item, draggedOver) => {}

  render() {
    return (
      <div style={{ width: 300 }}>
        <h2>Sortable List - Simple</h2>
        <Orchestrator>
          {items.map(item => {
            return (
              <SortableItem
                item={item}
                key={"sortable_item_" + item}
                onDragOver={this.handleDragOver.bind(this, item)}
                onDrop={this.handleDrop.bind(this, item)}
              />
            )
          })}
        </Orchestrator>
      </div>
    )
  }
}

export default SimpleSortableList
