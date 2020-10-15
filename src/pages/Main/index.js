import React, {useState} from 'react';

import SideBar from '../../template/sidebar';
import Content from '../../template/content/content';

import './style.scss';

const Main = (props) => {
    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  
    return (      
        <div className="template wrapper">
          <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} selectedPage="MONITORING" />
          <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen}>
            {props.children}
          </Content>
        </div>
    );
  };

export default Main;