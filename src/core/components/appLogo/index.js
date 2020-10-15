import React from 'react';

export default class AppLogo extends React.Component {
    render() {
        return (
            <img src={this.props.src} className={this.props.className} alt={this.props.alt} {...this.props}/>
        );
    }
}