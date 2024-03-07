import React from "react"
import Footer from "../Footer";

const Sidebar = ()=>{
  return(
    <></>
  );
}
const Home = () => {


  return (
 <div id="wrapper">
  {/* ========== Left Sidebar Start ========== */}
  <div className="left side-menu">
    <button type="button" className="button-menu-mobile button-menu-mobile-topbar open-left waves-effect">
      <i className="ion-close" />
    </button>
    <div className="left-side-logo d-block d-lg-none">
      <div className="text-center">
        <a href="index.html" className="logo"><img src="/assets/images/logo-dark.png" height={20} alt="logo" /></a>
      </div>
    </div>
    <div className="sidebar-inner slimscrollleft">
      <div id="sidebar-menu">
        <ul>
          <li className="menu-title">Main</li>
          <li>
            <a href="index.html" className="waves-effect">
              <i className="dripicons-meter" />
              <span> Dashboard <span className="badge badge-success badge-pill float-right">3</span></span>
            </a>
          </li>
          <li className="has_sub">
            <a href="javascript:void(0);" className="waves-effect"><i className="dripicons-briefcase" /> <span> Elements </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right" /></span></a>
            <ul className="list-unstyled">
              <li><a href="ui-alerts.html">Alerts</a></li>
              <li><a href="ui-buttons.html">Buttons</a></li>
              <li><a href="ui-badge.html">Badge</a></li>
              <li><a href="ui-cards.html">Cards</a></li>
              <li><a href="ui-dropdowns.html">Dropdowns</a></li>
              <li><a href="ui-tabs-accordions.html">Tabs &amp; Accordions</a></li>
              <li><a href="ui-modals.html">Modals</a></li>
              <li><a href="ui-images.html">Images</a></li>
              <li><a href="ui-progressbars.html">Progress Bars</a></li>
              <li><a href="ui-navs.html">Navs</a></li>
              <li><a href="ui-pagination.html">Pagination</a></li>
              <li><a href="ui-popover-tooltips.html">Popover &amp; Tooltips</a></li>
              <li><a href="ui-carousel.html">Carousel</a></li>
              <li><a href="ui-video.html">Video</a></li>
              <li><a href="ui-typography.html">Typography</a></li>
              <li><a href="ui-grid.html">Grid</a></li>
            </ul>
          </li>
          <li className="has_sub">
            <a href="javascript:void(0);" className="waves-effect"><i className="dripicons-broadcast" /> <span> Advanced UI </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right" /></span></a>
            <ul className="list-unstyled">
              <li><a href="advanced-alertify.html">Alertify</a></li>
              <li><a href="advanced-rating.html">Rating</a></li>
              <li><a href="advanced-nestable.html">Nestable</a></li>
              <li><a href="advanced-rangeslider.html">Range Slider</a></li>
              <li><a href="advanced-sweet-alert.html">Sweet-Alert</a></li>
              <li><a href="advanced-lightbox.html">Lightbox</a></li>
            </ul>
          </li>
          <li className="has_sub">
            <a href="javascript:void(0);" className="waves-effect"><i className="dripicons-document" /><span> Forms </span> <span className="badge badge-warning badge-pill float-right">8</span></a>
            <ul className="list-unstyled">
              <li><a href="form-elements.html">Form Elements</a></li>
              <li><a href="form-validation.html">Form Validation</a></li>
              <li><a href="form-advanced.html">Form Advanced</a></li>
              <li><a href="form-editors.html">Form Editors</a></li>
              <li><a href="form-uploads.html">Form File Upload</a></li>
              <li><a href="form-mask.html">Form Mask</a></li>
              <li><a href="form-summernote.html">Summernote</a></li>
              <li><a href="form-xeditable.html">Form Xeditable</a></li>
            </ul>
          </li>
          <li className="has_sub">
            <a href="javascript:void(0);" className="waves-effect"><i className="dripicons-graph-pie" /><span> Charts </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right" /></span></a>
            <ul className="list-unstyled">
              <li><a href="charts-morris.html">Morris Chart</a></li>
              <li><a href="charts-chartist.html">Chartist Chart</a></li>
              <li><a href="charts-chartjs.html">Chartjs Chart</a></li>
              <li><a href="charts-flot.html">Flot Chart</a></li>
              <li><a href="charts-c3.html">C3 Chart</a></li>
              <li><a href="charts-other.html">Jquery Knob Chart</a></li>
            </ul>
          </li>
          <li className="has_sub">
            <a href="javascript:void(0);" className="waves-effect"><i className="dripicons-list" /><span> Tables </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right" /></span></a>
            <ul className="list-unstyled">
              <li><a href="tables-basic.html">Basic Tables</a></li>
              <li><a href="tables-datatable.html">Data Table</a></li>
              <li><a href="tables-responsive.html">Responsive Table</a></li>
              <li><a href="tables-editable.html">Editable Table</a></li>
            </ul>
          </li>
          <li className="menu-title">Extra</li>
          <li className="has_sub">
            <a href="javascript:void(0);" className="waves-effect"><i className="dripicons-location" /><span> Maps </span> <span className="badge badge-danger badge-pill float-right">2</span></a>
            <ul className="list-unstyled">
              <li><a href="maps-google.html"> Google Map</a></li>
              <li><a href="maps-vector.html"> Vector Map</a></li>
            </ul>
          </li>
          <li className="has_sub">
            <a href="javascript:void(0);" className="waves-effect"><i className="dripicons-brightness-max" /> <span> Icons </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right" /></span></a>
            <ul className="list-unstyled">
              <li><a href="icons-material.html">Material Design</a></li>
              <li><a href="icons-ion.html">Ion Icons</a></li>
              <li><a href="icons-fontawesome.html">Font Awesome</a></li>
              <li><a href="icons-themify.html">Themify Icons</a></li>
              <li><a href="icons-dripicons.html">Dripicons</a></li>
              <li><a href="icons-typicons.html">Typicons Icons</a></li>
            </ul>
          </li>
          <li>
            <a href="calendar.html" className="waves-effect"><i className="dripicons-calendar" /><span> Calendar </span></a>
          </li>
          <li className="has_sub">
            <a href="javascript:void(0);" className="waves-effect"><i className="dripicons-copy" /><span> Pages </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right" /></span></a>
            <ul className="list-unstyled">
              <li><a href="pages-blank.html">Blank Page</a></li>
              <li><a href="pages-login.html">Login</a></li>
              <li><a href="pages-register.html">Register</a></li>
              <li><a href="pages-recoverpw.html">Recover Password</a></li>
              <li><a href="pages-lock-screen.html">Lock Screen</a></li>
              <li><a href="pages-404.html">Error 404</a></li>
              <li><a href="pages-500.html">Error 500</a></li>
            </ul>
          </li>
          <li className="has_sub">
            <a href="javascript:void(0);" className="waves-effect"><i className="dripicons-jewel" /><span> Extras </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right" /></span></a>
            <ul className="list-unstyled">
              <li><a href="extras-pricing.html">Pricing</a></li>
              <li><a href="extras-invoice.html">Invoice</a></li>
              <li><a href="extras-timeline.html">Timeline</a></li>
              <li><a href="extras-faqs.html">FAQs</a></li>
              <li><a href="extras-maintenance.html">Maintenance</a></li>
              <li><a href="extras-comingsoon.html">Coming Soon</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="clearfix" />
    </div> {/* end sidebarinner */}
  </div>
  {/* Left Sidebar End */}
  {/* Start right Content here */}
  <div className="content-page">
    {/* Start content */}
    <div className="content">
      {/* Top Bar Start */}
      <div className="topbar">
        <div className="topbar-left	d-none d-lg-block">
          <div className="text-center">
            <a href="index.html" className="logo"><img src="assets/images/logo.png" height={20} alt="logo" /></a>
          </div>
        </div>
        <nav className="navbar-custom">
          <ul className="list-inline float-right mb-0">
            <li className="list-inline-item notification-list dropdown d-none d-sm-inline-block">
              <form role="search" className="app-search">
                <div className="form-group mb-0"> 
                  <input type="text" className="form-control" placeholder="Search.." />
                  <button type="submit"><i className="fa fa-search" /></button>
                </div>
              </form> 
            </li>
            <li className="list-inline-item dropdown notification-list">
              <a className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <i className="mdi mdi-email-outline noti-icon" />
                <span className="badge badge-danger badge-pill noti-icon-badge">5</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-menu-lg">
                {/* item*/}
                <div className="dropdown-item noti-title">
                  <span className="badge badge-danger float-right">367</span>
                  <h5>Messages</h5>
                </div>
                <div className="slimscroll" style={{maxHeight: 230}}>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <div className="notify-icon"><img src="assets/images/users/user-2.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                    <p className="notify-details"><b>Charles M. Jones</b><span className="text-muted">Dummy text of the printing and typesetting industry.</span></p>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <div className="notify-icon"><img src="assets/images/users/user-3.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                    <p className="notify-details"><b>Thomas J. Mimms</b><span className="text-muted">You have 87 unread messages</span></p>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <div className="notify-icon"><img src="assets/images/users/user-4.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                    <p className="notify-details">Luis M. Konrad<span className="text-muted">It is a long established fact that a reader will</span></p>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <div className="notify-icon"><img src="assets/images/users/user-5.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                    <p className="notify-details"><b>Kendall E. Walker</b><span className="text-muted">Dummy text of the printing and typesetting industry.</span></p>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <div className="notify-icon"><img src="assets/images/users/user-6.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                    <p className="notify-details"><b>David M. Ryan</b><span className="text-muted">You have 87 unread messages</span></p>
                  </a>
                </div>
                {/* All*/}
                <a href="javascript:void(0);" className="dropdown-item notify-all">
                  View All
                </a>
              </div>
            </li>
            <li className="list-inline-item dropdown notification-list">
              <a className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <i className="mdi mdi-bell-outline noti-icon" />
                <span className="badge badge-success badge-pill noti-icon-badge">3</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-menu-lg">
                {/* item*/}
                <div className="dropdown-item noti-title">
                  <span className="badge badge-danger float-right">84</span>
                  <h5>Notification</h5>
                </div>
                <div className="slimscroll" style={{maxHeight: 230}}>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <div className="notify-icon bg-primary"><i className="mdi mdi-cart-outline" /></div>
                    <p className="notify-details">Your order is placed<span className="text-muted">Dummy text of the printing and typesetting industry.</span></p>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <div className="notify-icon bg-success"><i className="mdi mdi-message" /></div>
                    <p className="notify-details">New Message received<span className="text-muted">You have 87 unread messages</span></p>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <div className="notify-icon bg-warning"><i className="mdi mdi-martini" /></div>
                    <p className="notify-details">Your item is shipped<span className="text-muted">It is a long established fact that a reader will</span></p>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <div className="notify-icon bg-danger"><i className="mdi mdi-message" /></div>
                    <p className="notify-details">New Message received<span className="text-muted">You have 87 unread messages</span></p>
                  </a>
                  {/* item*/}
                  <a href="javascript:void(0);" className="dropdown-item notify-item">
                    <div className="notify-icon bg-info"><i className="mdi mdi-martini" /></div>
                    <p className="notify-details">Your item is shipped<span className="text-muted">It is a long established fact that a reader will</span></p>
                  </a>
                </div>
                {/* All*/}
                <a href="javascript:void(0);" className="dropdown-item notify-all">
                  View All
                </a>
              </div>
            </li>
            <li className="list-inline-item dropdown notification-list">
              <a className="nav-link dropdown-toggle arrow-none waves-effect nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <img src="assets/images/users/user-1.jpg" alt="user" className="rounded-circle" />
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown ">
                <a className="dropdown-item" href="#"><i className="mdi mdi-account-circle m-r-5 text-muted" /> Profile</a>
                <a className="dropdown-item" href="#"><span className="badge badge-success mt-1 float-right">5</span><i className="mdi mdi-settings m-r-5 text-muted" /> Settings</a>
                <a className="dropdown-item" href="#"><i className="mdi mdi-lock-open-outline m-r-5 text-muted" /> Lock screen</a>
                <a className="dropdown-item" href="#"><i className="mdi mdi-logout m-r-5 text-muted" /> Logout</a>
              </div>
            </li>
          </ul>
          <ul className="list-inline menu-left mb-0">
            <li className="list-inline-item">
              <button type="button" className="button-menu-mobile open-left waves-effect">
                <i className="ion-navicon" />
              </button>
            </li>
          </ul>
          <div className="clearfix" />
        </nav>
      </div>
      {/* Top Bar End */}
      <div className="page-content-wrapper ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="float-right page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item"><a href="#">Pages</a></li>
                  <li className="breadcrumb-item active">Starter</li>
                </ol>
              </div>
              <h5 className="page-title">Starter Page</h5>
            </div>
          </div>                
        </div>{/* container fluid */}
      </div> {/* Page content Wrapper */}
    </div> {/* content */}
    <footer className="footer">
      © 2018 - 2020 <b>Drixo</b> <span className="d-none d-sm-inline-block"> - Crafted with <i className="mdi mdi-heart text-danger" /> by Themesdesign.</span>
    </footer>
  </div>
  {/* End Right content here */}
</div>


  )
}
export default Home;