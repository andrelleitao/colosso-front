import React from 'react';

class Password extends React.Component {
    render() {
        return (
            <input 
                type="password"
                {...this.props} />
        );
    }
}

export default Password;