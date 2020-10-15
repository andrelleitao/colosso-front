import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../storage/auth';

export const PrivateRoute = ({ component: Component, content: Content, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props}><Content /></Component>
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);