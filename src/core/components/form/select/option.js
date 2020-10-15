import React from 'react';

class Option extends React.Component {
    render() {
        return (
            <option {...this.props}>{this.props.children}</option>
        );
    }
}

export default Option;