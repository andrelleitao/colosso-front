import React, { useState } from "react";
import classNames from "classnames";
import { Collapse, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from 'react-i18next';

import '../style.scss';

const SubMenu = (props) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggle = () => setCollapsed(!collapsed);
    const { icon, title, items, collapsable, isSelected } = props;
    
    return (
        (collapsable) ? (
            <>
                <NavItem
                    onClick={toggle}
                    className={classNames({ "menu-open": !collapsed })}>
                    <NavLink
                        className={classNames({ "dropdown-toggle": true }, { "dropdown-toggle-open": !collapsed }, { "selected": !collapsed })}>
                        <img
                            alt=""
                            src={icon}
                            className="mr-2 item-icon" />
                        {title}
                    </NavLink>
                </NavItem>
                <Collapse
                    isOpen={!collapsed}
                    navbar
                    className={classNames("items-menu", { "mb-1": !collapsed })}>
                    {items.map((item, index) => (
                        <NavItem key={index} className="pl-4">
                            <NavLink tag={Link} to={item.target}>
                                <span>
                                    <Trans i18nKey={item.title} />
                                </span>
                            </NavLink>
                        </NavItem>
                    ))}
                </Collapse>
            </>
        ) : (
                <>
                    <NavItem
                        className={classNames({ "menu-open": !collapsed, "item-active": isSelected, "item": !isSelected })}>
                        <NavLink 
                            tag={Link}
                            className={classNames({ "dropdown-toggle": false }, { "dropdown-toggle-open": !collapsed }, { "selected": !collapsed })}
                        >
                            <img
                                src={icon}
                                alt=""
                                className="mr-2 item-icon" />
                        </NavLink>
                        <span>
                            <Trans i18nKey={title} />
                        </span>
                    </NavItem>
                    
                    <Collapse
                        isOpen={!collapsed}
                        navbar
                        className={classNames("items-menu", { "mb-1": !collapsed })}>
                        {items.map((item, index) => (
                            <NavItem key={index} className="pl-4">
                                <NavLink tag={Link} to={item.target}>
                                    <span>
                                        <Trans i18nKey={item.title} />
                                    </span>
                                </NavLink>
                            </NavItem>
                        ))}
                    </Collapse>
                </>
            )
    );
};

export default SubMenu;