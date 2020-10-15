import React, { useState } from 'react';
import { Container, NavLink, Nav, NavItem, TabPane, TabContent } from 'reactstrap';
import "./style.scss";
import classNames from "classnames";
import CrudGrid from './components/crudGrid';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/loading';

export default function Crud(props) {
    const [activeTab, setActiveTab] = useState("1");
    const { t } = useTranslation();

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    return (
        <div className="crud">
            <Container fluid className="crud">
                <h2>{props.pageTitle}</h2>
                <hr />
                <Nav id="crud-tabs" tabs>
                    <NavItem>
                        <NavLink
                            className={classNames({ active: activeTab === "1" })}
                            onClick={() => { toggle("1"); }}
                        >
                            {t('crud.tab.list')}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classNames({ active: activeTab === "2" })}
                            onClick={() => { toggle("2"); }}
                        >
                            {t('crud.tab.new')}
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <CrudGrid
                            url={props.url}
                            columns={props.columns}
                            modalSearch={props.modalSearch}
                            onClickEdit={props.onClickEdit}
                            onClickDelete={props.onClickDelete}
                            onToggle={toggle} 
                            filter={props.filter}/>
                    </TabPane>
                    <TabPane tabId="2">
                        {props.children}
                    </TabPane>
                </TabContent>
            </Container>

            { /* Loading fullscreen */ }            
            <Loading loading={props.loading} />
        </div>
    );
}