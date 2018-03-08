import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Connector extends Component {
  render() {
    return this.props.children({ ...this.context })
  }
}

Connector.contextTypes = {
  dragInProgress: PropTypes.bool,
  draggedOver: PropTypes.shape({
    id: PropTypes.number,
    draggingSource: PropTypes.number,
    data: PropTypes.object
  }),
  draggingSource: PropTypes.any,
  registerTarget: PropTypes.func,
  deregisterTarget: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func
}
