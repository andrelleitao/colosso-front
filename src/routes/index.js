import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ActiveAccount from '../pages/ActiveAccount';
import Dashboard from '../pages/Dashboard';
import { PrivateRoute } from './privateRoute';
import Main from '../pages/Main';
import NotFound from '../core/template/notFound';
import Group from '../pages/Administration/Group';
import Role from '../pages/Administration/Role';
import User from '../pages/Administration/User';


class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/forgotPassword" component={ForgotPassword} />
                    <Route path="/resetPassword" component={ResetPassword} />
                    <Route path="/activeAccount" component={ActiveAccount} />

                    <PrivateRoute path="/main" component={Main} content={Dashboard} />

                    {/* Administration Module */}
                    <PrivateRoute path="/administration/group" component={Main} content={Group} /> 
                    <PrivateRoute path="/administration/role" component={Main} content={Role} /> 
                    <PrivateRoute path="/administration/user" component={Main} content={User} /> 

                    <Route path="*" component={NotFound} />  
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Routes;