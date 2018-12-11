import React from 'react'

class Cell extends React.Component {
    state = {
        isLiving: this.props.isLiving,
        id: this.props.id
    }
    render() {
        return (
            <>
            <p>hey</p>
            </>
        )
    }
}

export default Cell;
