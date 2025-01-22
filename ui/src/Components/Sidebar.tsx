import { useState } from "react";
import {Link , useLocation} from "react-router-dom";

interface ItemProps
{
  Name:string,
  Path:string,
  Icon:string
}

interface CollapsableCollectionProps
{
    Name: string;
    Icon: string;
    children: React.ReactNode;
}

function SideBarItem({ Name , Path , Icon } : ItemProps){
  return(
    <li className={`nav-item ${Path == useLocation().pathname ? "active" : ""}`}> 
      <Link to={Path}>
        <i className={"la " + Icon}></i>
          <p>{Name}</p>
      </Link> 
    </li>
  );
}

const CollapsableCollection:React.FC<CollapsableCollectionProps> = ({Name , Icon ,children}:CollapsableCollectionProps) =>
{
  const [submenu1Open, setSubmenu1Open] = useState(false);
  return (
    <li className="nav-item">
      <a className="nav-link collapsed text-truncate" href="#" onClick={() => setSubmenu1Open(!submenu1Open)}><i className={"fa " + Icon}></i>
      <span className="d-none d-sm-inline">{Name}</span></a>
      <div className={`collapse ${submenu1Open ? "show" : ""}`} aria-expanded={submenu1Open}>
          <ul className="flex-column pl-4 nav">   
            {children}
          </ul>
          </div>
    </li>  
  );
}

function SideBarItm({}){
  const [submenu1Open, setSubmenu1Open] = useState(false);
  const [submenu1sub1Open, setSubmenu1sub1Open] = useState(false);

  return (  
                <li className="nav-item">
                    <a className="nav-link collapsed text-truncate" href="#" onClick={() => setSubmenu1Open(!submenu1Open)}><i className="fa fa-table"></i>
                      <span className="d-none d-sm-inline">Reports</span></a>
                    <div className={`collapse ${submenu1Open ? "show" : ""}`} aria-expanded={submenu1Open}>
                        <ul className="flex-column pl-2 nav">                            
                            {/* <li className="nav-item">
                                <a className="nav-link  text-truncate collapsed py-1" href="#" onClick={() => setSubmenu1sub1Open(!submenu1sub1Open)}><span>Customers</span></a>
                                <div className={`collapse ${submenu1sub1Open ? "show" : ""}`} aria-expanded={submenu1sub1Open}>
                                    <ul className="flex-column nav pl-4">
                                        <li className="nav-item">
                                            <a className="nav-link p-1 text-truncate" href="#">
                                                <i className="fa fa-fw fa-clock-o"></i> Daily </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link p-1 text-truncate" href="#">
                                                <i className="fa fa-fw fa-dashboard"></i> Dashboard </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link p-1 text-truncate" href="#">
                                                <i className="fa fa-fw fa-bar-chart"></i> Charts </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link p-1 text-truncate" href="#">
                                                <i className="fa fa-fw fa-compass"></i> Areas </a>
                                        </li>
                                    </ul>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </li>
  );
}

function SideBarOptions(){
  return(
    <>
      <SideBarItem Name="Home" Path="/" Icon="la-dashboard"/>
      <SideBarItem Name="Employee wise revenue" Path="/employee_wise_revenue" Icon="la-table" />
      <SideBarItem Name="Payment-mode wise" Path="/payment_mode_wise_revenue" Icon="la-keyboard-o" />
    </>
  );
}

function SideBar(){
    return(
        <div className="sidebar">
        <div className="scrollbar-inner sidebar-wrapper">
        <ul className="nav">
          {/* <SideBarOptions/> */}
          <SideBarItem Name="Home" Path="/" Icon="la-dashboard"/>
          <CollapsableCollection Name="Revenue By" Icon="fa-table">
            <SideBarItem Name="Employees" Path="/employee_wise_revenue" Icon="la-table" />
            <SideBarItem Name="Payment-Modes" Path="/payment_mode_wise_revenue" Icon="la-keyboard-o" />
          </CollapsableCollection>
      </ul>
    </div>
  </div>
    );
}
export default SideBar;