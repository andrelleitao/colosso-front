import React from 'react';

import Option from './option';

class Select extends React.Component {
    static Option = Option;

    render() {
        return (
            <select {...this.props}>
                {this.props.children}
            </select>
        );
    }
}

export default Select;