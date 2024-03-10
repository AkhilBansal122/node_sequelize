import react from "react";
import { Link } from "react-router-dom";
import { Admin_dashboard,Admin_User_Management,Admin_Caregory_Management,Admin_SubCategory_Management,ADMIN_Email_template } from "../../common";

const Sidebar = () => {
  return (
    <div className="left side-menu">
      <button type="button" className="button-menu-mobile button-menu-mobile-topbar open-left waves-effect">
        <i className="ion-close" />
      </button>
      <div className="left-side-logo d-block d-lg-none">
        <div className="text-center">
          <Link to="index.html" className="logo"><img src="/assets/images/logo-dark.png" height={20} alt="logo" /></Link>
        </div>
      </div>
      <div className="sidebar-inner slimscrollleft">
        <div id="sidebar-menu">
          <ul>
            <li className="menu-title"></li>
            <li>
              <Link to="/admin/dashboard" className="waves-effect">
                <i className="dripicons-meter" />
                <span> {Admin_dashboard} <span className="badge badge-success badge-pill float-right">3</span></span>
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard" className="waves-effect">
                <i className="dripicons-user" />
                <span> {Admin_User_Management} </span>
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard" className="waves-effect">
                <i className="dripicons-user" />
                <span> {Admin_Caregory_Management} </span>
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard" className="waves-effect">
                <i className="dripicons-user" />
                <span> {Admin_SubCategory_Management} </span>
              </Link>
            </li>
           
          </ul>
        </div>
        <div className="clearfix" />
      </div> {/* end sidebarinner */}
    </div>
  );
};

export default Sidebar;