import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

class Orchestrator extends Component {
  sourceId = 1
  targets = []

  state = {
    draggingSource: null,
    draggedOver: null
  }

  getChildContext = () => ({
    draggingSource: this.state.draggingSource,
    beginDrag: this.beginDrag,
    endDrag: this.endDrag,
    registerTarget: this.registerTarget,
    deregisterTarget: this.deregisterTarget,
    onDragOver: this.onDragOver,
    onDragLeave: this.onDragLeave,
    onDrop: this.onDrop,
    dragInProgress: !!this.state.draggingSource,
    draggedOver: this.state.draggedOver,
    getSourceId: this.getSourceId
  })

  getSourceId = () => {
    return this.sourceId++
  }

  beginDrag = (id, draggingSourceProps, e) => {
    this.setState({ draggingSource: { id, ...draggingSourceProps } })

    if (this.props.customPreview) {
      var myDiv = document.createElement("div")
      myDiv.style.transform =
        "translateX(-500px)" /* or visibility: hidden, or any of the above */
      document.body.appendChild(myDiv)
      ReactDOM.render(this.props.customPreview(draggingSourceProps), myDiv)
      e.dataTransfer.setDragImage(myDiv, -300, 20)
    }
  }

  endDrag = id => {
    this.setState({ draggingSource: null, draggedOver: null })
  }

  registerTarget = data => {
    this.targets = this.targets.concat(data)
    return this.targets.length - 1
  }

  deregisterTarget = id => {
    this.targets.splice(id, 1)
  }

  onDragOver = (id, data, e) => {
    e.preventDefault() // crucial for onDrop to work

    const { draggingSource, draggedOver } = this.state
    if (!draggedOver || draggedOver.id !== id) {
      this.setState({
        draggedOver: {
          data,
          id,
          draggingSource
        }
      })
    }
  }

  onDragLeave = id => {
    this.setState({ draggedOver: null })
    console.log("onDragLeave")
  }

  onDrop = id => {
    this.setState({ draggedOver: null, draggingSource: null })
  }

  render() {
    const { children } = this.props
    return children
  }
}

Orchestrator.propTypes = {
  customPreview: PropTypes.element
}

Orchestrator.childContextTypes = {
  draggingSource: PropTypes.number,
  dragInProgress: PropTypes.bool,
  beginDrag: PropTypes.func,
  endDrag: PropTypes.func,
  registerTarget: PropTypes.func,
  deregisterTarget: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func,
  draggedOver: PropTypes.shape({
    id: PropTypes.number,
    draggingSource: PropTypes.number
  }),
  getSourceId: PropTypes.func
}

export default Orchestrator
