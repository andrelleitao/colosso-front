import React from 'react';

class Text extends React.Component {
    render() {
        return (
            <input 
                type="text" 
                {...this.props} />
        );
    }
}

export default Text;