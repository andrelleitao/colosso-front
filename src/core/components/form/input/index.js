import React from 'react';

import Password from './password';
import Text from './text';
import Checkbox from './checkbox';
import Email from './email';
import Date from './date';

class Input extends React.Component {
    static Password = Password;
    static Text = Text;
    static Checkbox = Checkbox;
    static Email = Email;
    static Date = Date;

    render() {
        return (this.props.children);
    }
}

export default Input;