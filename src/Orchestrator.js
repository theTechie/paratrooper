import { Component } from "react";
import PropTypes from "prop-types";

class Orchestrator extends Component {
  targets = [];

  state = {
    draggingSource: null,
    draggedOver: null
  };

  getChildContext = () => ({
    draggingSource: this.state.draggingSource,
    beginDrag: this.beginDrag,
    endDrag: this.endDrag,
    registerTarget: this.registerTarget,
    deregisterTarget: this.deregisterTarget,
    onDragOver: this.onDragOver,
    onDragLeave: this.onDragLeave,
    onDrop: this.onDrop,
    dragInProgress: this.state.draggingSource !== null,
    draggedOver: this.state.draggedOver
  });

  beginDrag = data => {
    this.setState({ draggingSource: data });
  };

  endDrag = id => {
    this.setState({ draggingSource: null, draggedOver: null });
  };

  registerTarget = data => {
    this.targets = this.targets.concat(data);
    return this.targets.length - 1;
  };

  deregisterTarget = id => {
    this.targets.splice(id, 1);
  };

  onDragOver = (id, data, e) => {
    e.preventDefault(); // crucial for onDrop to work

    const { draggingSource, draggedOver } = this.state;
    if (!draggedOver || draggedOver.id !== id) {
      this.setState({
        draggedOver: {
          data,
          id,
          draggingSource
        }
      });
    }
  };

  onDragLeave = id => {
    this.setState({ draggedOver: null });
    console.log("onDragLeave");
  };

  onDrop = id => {
    // const draggedOver = this.state.draggedOver;
    // this.setState({ draggedOver: null });
  };

  render() {
    const { children } = this.props;
    return children;
  }
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
  })
};

export default Orchestrator;
