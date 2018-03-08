import React, { Component } from "react"
import PropTypes from "prop-types"

class DragSource extends Component {
    render() {
        const { children } = this.props
        const { beginDrag, endDrag, draggingSource } = this.context
        const isDragging = draggingSource === this.id

        return (
            <div
                draggable={true}
                onDragStart={beginDrag.bind(null, this.props.data)}
                onDragEnd={endDrag.bind(null, this.id)}
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
    endDrag: PropTypes.func
}

export default DragSource
