import React, { Component } from 'react';

class Checkbox extends Component {
    render() {
        return (
            <button className="icon" onClick={this.props.onChange}>
                <div className="icon-checkbox"></div>
            </button>
        );
    }
}

export default Checkbox;