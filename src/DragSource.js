import React, { Component } from "react"
import PropTypes from "prop-types"

class DragSource extends Component {
  id = null

  componentWillMount() {
    this.id = this.context.getSourceId()
  }

  render() {
    const { children } = this.props
    const { beginDrag, endDrag, draggingSource } = this.context
    const isDragging = draggingSource && draggingSource.id === this.id

    return (
      <div
        draggable={true}
        onDragStart={beginDrag.bind(null, this.id, this.props)}
        onDragEnd={endDrag.bind(null, this.id)}
        style={{ cursor: "move" }}
      >
        {children({ isDragging })}
      </div>
    )
  }
}

DragSource.propTypes = {
  data: PropTypes.object
}

DragSource.contextTypes = {
  draggingSource: PropTypes.number,
  beginDrag: PropTypes.func,
  endDrag: PropTypes.func,
  getSourceId: PropTypes.func
}

export default DragSource
