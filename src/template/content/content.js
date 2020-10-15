import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Route, Switch } from "react-router-dom";

import Topbar from "./topbar";
import Dashboard from "../../pages/Dashboard";
import User from "../../pages/Administration/User";
import Group from "../../pages/Administration/Group";

const Content = (props) => (
    <Container
        fluid
        className={classNames("content", { "is-open": props.sidebarIsOpen })}>   
        {props.children}
    </Container>
);

export default Content;