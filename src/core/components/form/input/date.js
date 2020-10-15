import React from 'react';

class Date extends React.Component {
    initialState = {
        date: ''
    }
    state = this.initialState;

    dateMask = value => {
        const characterLimit = 10;
        value = value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1/$2');
    
        if (value.length > 10) {
            value = value.substring(0, characterLimit);
        }
    
        return value;
    }

    handleChange = e => {        
        this.setState({ date: this.dateMask(e.target.value) })     
        this.props.callback(this.dateMask(e.target.value));        
    }

    render() {
        return (
            <input
                type="text"
                className={this.props.className}
                onChange={this.handleChange} 
                placeholder={this.props.placeholder}
                value={this.state.date}/>
        );
    }
}

export default Date;