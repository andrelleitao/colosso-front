import React from 'react';

class Email extends React.Component {
    render() {
        return (
            <input 
                type="email" 
                {...this.props} />
        );
    }
}

export default Email;