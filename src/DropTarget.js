import React, { Component } from "react"
import PropTypes from "prop-types"

class DropTarget extends Component {
  componentWillMount() {
    this.id = this.context.registerTarget(this.props.data)
  }
  componentWillUnmount() {
    this.context.deregisterTarget(this.id)
  }
  render() {
    const { children, onDrop: onDropCallback, data } = this.props
    const {
      onDragOver,
      onDragLeave,
      dragInProgress,
      draggedOver,
      draggingSource,
      onDrop
    } = this.context

    return (
      <div
        onDragOver={e => {
          // console.log("onDragOver", draggedOver, draggingSource)
          onDragOver(this.id, data, e)
          this.props.onDragOver && this.props.onDragOver(draggedOver)
        }}
        onDragLeave={onDragLeave.bind(null, this.id, data)}
        onDrop={() => {
          onDrop(draggedOver)
          onDropCallback(draggingSource)
        }}
      >
        {children({
          dragInProgress,
          isDraggedOver: draggedOver ? draggedOver.id === this.id : false,
          draggingSource
        })}
      </div>
    )
  }
}

DropTarget.propTypes = {
  data: PropTypes.object,
  isDraggedOver: PropTypes.bool
}

DropTarget.contextTypes = {
  dragInProgress: PropTypes.bool,
  draggedOver: PropTypes.shape({
    id: PropTypes.number,
    draggingSource: PropTypes.number
  }),
  draggingSource: PropTypes.any,
  registerTarget: PropTypes.func,
  deregisterTarget: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func
}

export default DropTarget
