import React, { useEffect, useState } from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from 'react-i18next';

import SubMenu from "./submenu";
import AppLogo from "../../assets/app-logo-white.png";
import MenuHamburguer from "./assets/menuHamburguer.svg";

import { administrationItems } from './submenu/items/admistration';
import { MENU_ADMINISTRATION, MENU_DASHBOARD } from "./constants/menu";

import DashboardIcon from "./assets/icons/dashboardIcon.svg";
import DashboardIconActive from "./assets/icons/dashboardIconActive.svg";
import AdministrationIcon from "./assets/icons/administrationIcon.svg";
import AdministrationIconActive from "./assets/icons/administrationIconActive.svg";

import './style.scss';

export default function SideBar({ isOpen, toggle, selectedPage }) {
  const [collapsable, setCollapsable] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      setCollapsable(isOpen);
    }, 250);
  }, [isOpen])

  // Contém todos os menus da Sidebar
  const menus = [
    {
      isSelected: selectedPage === MENU_DASHBOARD,
      title: 'menu.dashboard',
      target: '/main',
      icon: DashboardIcon,
      activeIcon: DashboardIconActive,
      submenus: []
    },
    {
      isSelected: selectedPage === MENU_ADMINISTRATION,
      title: 'menu.administration',
      target: '',
      icon: AdministrationIcon,
      activeIcon: AdministrationIconActive,
      submenus: administrationItems
    }
  ];

  return (
    <>
      {
        collapsable ? (
          <div className={classNames("sidebar", { "is-open": isOpen })}>
            <div className="sidebar-header">
              <img src={AppLogo} width="89px" height="20px" className="img-fluid mt-3 mb-2 ml-2" alt="" />
              <img src={MenuHamburguer} width="26px" height="21px" onClick={toggle} alt="" className="menu-hamburguer" />
            </div>
            <div className="side-menu">
              <Nav vertical className="nav">
                {
                  menus.map((menu) => {
                    // Verifica se é menu simples ou se é um menu que 
                    // possui submenus associados. Vai depender da lista informada em 'submenus'.
                    return (
                      (menu.submenus != null && menu.submenus.length == 0) ? (
                        <NavItem className={menu.isSelected ? "active" : ""}>
                          <NavLink tag={Link} to={menu.target}>
                            <img
                              src={
                                !menu.isSelected
                                  ? menu.icon
                                  : menu.activeIcon
                              }
                              className="mr-2 item-icon"
                              alt=""
                            />
                            <span>
                              <Trans i18nKey={menu.title} />
                            </span>
                          </NavLink>
                        </NavItem>
                      ) : (
                          <SubMenu
                            title={t(menu.title)}
                            icon={
                              !menu.isSelected
                                ? menu.icon
                                : menu.activeIcon
                            }
                            items={menu.submenus} 
                            collapsable={collapsable}
                            isSelected={menu.isSelected}/>
                        )
                    );
                  })
                }
              </Nav>
            </div>
          </div>
        ) : (
            <div className={classNames("collapsable", { "is-collapsable": isOpen })}>
              <div className="text-center">
                <img src={MenuHamburguer} width="26px" height="26px" onClick={toggle} alt="" className="menu-hamburger-collapsable" />
              </div>
              <div className="side-menu">
                <Nav vertical className="nav">
                  {
                    menus.map((menu) => {
                      // Verifica se é menu simples ou se é um menu que 
                      // possui submenus associados. Vai depender da lista informada em 'submenus'.
                      return (
                        (menu.submenus != null && menu.submenus.length == 0) ? (
                          <NavItem className={menu.isSelected ? "item-active" : "item"}>
                            <NavLink tag={Link} to={menu.target}>
                              <img
                                src={
                                  !menu.isSelected
                                    ? menu.icon
                                    : menu.activeIcon
                                }
                                alt=""
                                className="mr-2 item-icon" />
                            </NavLink>
                            <span>
                              <Trans i18nKey={menu.title} />
                            </span>
                          </NavItem>
                        ) : (                            
                            <SubMenu
                              title={menu.title}
                              icon={
                                !menu.isSelected
                                  ? menu.icon
                                  : menu.activeIcon
                              }
                              items={menu.submenus} 
                              collapsable={collapsable}
                              isSelected={menu.isSelected}/>
                          )
                      );
                    })
                  }
                </Nav>
              </div>
            </div>
          )
      }
    </>
  );
}