
import {Link , useLocation} from "react-router-dom"

interface ItemProps
{
  Name:string,
  Path:string,
  Icon:string
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

function SideBar(){
    return(
        <div className="sidebar">
        <div className="scrollbar-inner sidebar-wrapper">
        <ul className="nav">
          <SideBarItem Name="Dashboard" Path="/" Icon="la-dashboard"/>
          <SideBarItem Name="Menu 1" Path="/menu1" Icon="la-table" />
          <SideBarItem Name="Menu 2" Path="#" Icon="la-keyboard-o" />
          <SideBarItem Name="Menu 3" Path="#" Icon="la-th" />
          <SideBarItem Name="Menu 4" Path="#" Icon="la-bell" />
          <SideBarItem Name="Menu 5" Path="#" Icon="la-font" />
          <SideBarItem Name="Menu 6" Path="#" Icon="la-table" />
          <SideBarItem Name="Menu 7" Path="#" Icon="la-table" />
          <SideBarItem Name="Menu 8" Path="#" Icon="la-table" />
      </ul>
    </div>
  </div>
    );
}
export default SideBar;