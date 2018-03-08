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
      draggingSource
    } = this.context

    return (
      <div
        onDragOver={onDragOver.bind(null, this.id, data)}
        onDragLeave={onDragLeave.bind(null, this.id, data)}
        onDrop={() => onDropCallback(draggingSource)}
      >
        {children({
          dragInProgress,
          draggedOver: draggedOver
            ? { ...draggedOver, overMe: draggedOver.id === this.id }
            : null,
          draggingSource
        })}
      </div>
    )
  }
}

DropTarget.propTypes = {
  data: PropTypes.object
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
