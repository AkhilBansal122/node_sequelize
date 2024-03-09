import React from "react"
import axios from 'axios';

import { ADMIN_LOGOUT,LOGO_URL } from "../../common";
import { useNavigate,Link  } from 'react-router-dom';

const Home = () => {

  const navigate  = useNavigate();
  const Logout = async (event) => {

    event.preventDefault();
    // Your logout logic here
    const checked = localStorage.getItem('token');
    try {
      if (checked.length > 0) {

        const response = await axios.post(ADMIN_LOGOUT,
          {}, // here is supposed to be `data`
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: "Bearer " + checked
            }
          });

        var result = response.data;
        if (result.status == true) {
          navigate("/");
          localStorage.clear();
        }
      }

    } catch (error) {
      navigate("/");
    
    }
  }

  return (
    <div id="wrapper">
      {/* ========== Left Sidebar Start ========== */}
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
              <li className="menu-title">Main</li>
              <li>
                <Link to="index.html" className="waves-effect">
                  <i className="dripicons-meter" />
                  <span> Dashboard <span className="badge badge-success badge-pill float-right">3</span></span>
                </Link>
              </li>
              <li className="has_sub">
                <Link href="/" className="waves-effect"><i className="dripicons-briefcase" /> <span> Elements </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right" /></span></Link>
                <ul className="list-unstyled">
                  <li><Link to="ui-alerts.html">Alerts</Link></li>
                  <li><Link to="ui-buttons.html">Buttons</Link></li>
                  <li><Link to="ui-badge.html">Badge</Link></li>
                  <li><Link to="ui-cards.html">Cards</Link></li>
                  <li><Link to="ui-dropdowns.html">Dropdowns</Link></li>
                  <li><Link to="ui-tabs-accordions.html">Tabs &amp; Accordions</Link></li>
                  <li><Link to="ui-modals.html">Modals</Link></li>
                  <li><Link to="ui-images.html">Images</Link></li>
                  <li><Link to="ui-progressbars.html">Progress Bars</Link></li>
                  <li><Link to="ui-navs.html">Navs</Link></li>
                  <li><Link to="ui-pagination.html">Pagination</Link></li>
                  <li><Link to="ui-popover-tooltips.html">Popover &amp; Tooltips</Link></li>
                  <li><Link to="ui-carousel.html">Carousel</Link></li>
                  <li><Link to="ui-video.html">Video</Link></li>
                  <li><Link to="ui-typography.html">Typography</Link></li>
                  <li><Link to="ui-grid.html">Grid</Link></li>
                </ul>
              </li>
              <li className="has_sub">
                <Link to="/" className="waves-effect"><i className="dripicons-broadcast" /> <span> Advanced UI </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right" /></span></Link>
                <ul className="list-unstyled">
                  <li><Link to="advanced-alertify.html">Alertify</Link></li>
                  <li><Link to="advanced-rating.html">Rating</Link></li>
                  <li><Link to="advanced-nestable.html">Nestable</Link></li>
                  <li><Link to="advanced-rangeslider.html">Range Slider</Link></li>
                  <li><Link to="advanced-sweet-alert.html">Sweet-Alert</Link></li>
                  <li><Link to="advanced-lightbox.html">Lightbox</Link></li>
                </ul>
              </li>
              <li className="has_sub">
                <Link to="/" className="waves-effect"><i className="dripicons-document" /><span> Forms </span> <span className="badge badge-warning badge-pill float-right">8</span></Link>
                <ul className="list-unstyled">
                  <li><Link to="form-elements.html">Form Elements</Link></li>
                  <li><Link to="form-validation.html">Form Validation</Link></li>
                  <li><Link to="form-advanced.html">Form Advanced</Link></li>
                  <li><Link to="form-editors.html">Form Editors</Link></li>
                  <li><Link to="form-uploads.html">Form File Upload</Link></li>
                  <li><Link to="form-mask.html">Form Mask</Link></li>
                  <li><Link to="form-summernote.html">Summernote</Link></li>
                  <li><Link to="form-xeditable.html">Form Xeditable</Link></li>
                </ul>
              </li>
              <li className="has_sub">
                <Link to="/" className="waves-effect"><i className="dripicons-graph-pie" /><span> Charts </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right" /></span></Link>
                <ul className="list-unstyled">
                  <li><Link to="charts-morris.html">Morris Chart</Link></li>
                  <li><Link to="charts-chartist.html">Chartist Chart</Link></li>
                  <li><Link to="charts-chartjs.html">Chartjs Chart</Link></li>
                  <li><Link to="charts-flot.html">Flot Chart</Link></li>
                  <li><Link to="charts-c3.html">C3 Chart</Link></li>
                  <li><Link to="charts-other.html">Jquery Knob Chart</Link></li>
                </ul>
              </li>
              <li className="has_sub">
                <Link to="/" className="waves-effect"><i className="dripicons-list" /><span> Tables </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right" /></span></Link>
                <ul className="list-unstyled">
                  <li><Link to="tables-basic.html">Basic Tables</Link></li>
                  <li><Link to="tables-datatable.html">Data Table</Link></li>
                  <li><Link to="tables-responsive.html">Responsive Table</Link></li>
                  <li><Link to="tables-editable.html">Editable Table</Link></li>
                </ul>
              </li>
              <li className="menu-title">Extra</li>
              <li className="has_sub">
                <Link to="/" className="waves-effect"><i className="dripicons-location" /><span> Maps </span> <span className="badge badge-danger badge-pill float-right">2</span></Link>
                <ul className="list-unstyled">
                  <li><Link to="maps-google.html"> Google Map</Link></li>
                  <li><Link to="maps-vector.html"> Vector Map</Link></li>
                </ul>
              </li>
              <li className="has_sub">
                <Link to="/" className="waves-effect"><i className="dripicons-brightness-max" /> <span> Icons </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right" /></span></Link>
                <ul className="list-unstyled">
                  <li><Link to="icons-material.html">Material Design</Link></li>
                  <li><Link to="icons-ion.html">Ion Icons</Link></li>
                  <li><Link to="icons-fontawesome.html">Font Awesome</Link></li>
                  <li><Link to="icons-themify.html">Themify Icons</Link></li>
                  <li><Link to="icons-dripicons.html">Dripicons</Link></li>
                  <li><Link to="icons-typicons.html">Typicons Icons</Link></li>
                </ul>
              </li>
              <li>
                <Link to="calendar.html" className="waves-effect"><i className="dripicons-calendar" /><span> Calendar </span></Link>
              </li>
              <li className="has_sub">
                <Link to="/" className="waves-effect"><i className="dripicons-copy" /><span> Pages </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right" /></span></Link>
                <ul className="list-unstyled">
                  <li><Link to="pages-blank.html">Blank Page</Link></li>
                  <li><Link to="pages-login.html">Login</Link></li>
                  <li><Link to="pages-register.html">Register</Link></li>
                  <li><Link to="pages-recoverpw.html">Recover Password</Link></li>
                  <li><Link to="pages-lock-screen.html">Lock Screen</Link></li>
                  <li><Link to="pages-404.html">Error 404</Link></li>
                  <li><Link to="pages-500.html">Error 500</Link></li>
                </ul>
              </li>
              <li className="has_sub">
                <Link to="/" className="waves-effect"><i className="dripicons-jewel" /><span> Extras </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right" /></span></Link>
                <ul className="list-unstyled">
                  <li><Link to="extras-pricing.html">Pricing</Link></li>
                  <li><Link to="extras-invoice.html">Invoice</Link></li>
                  <li><Link to="extras-timeline.html">Timeline</Link></li>
                  <li><Link to="extras-faqs.html">FAQs</Link></li>
                  <li><Link to="extras-maintenance.html">Maintenance</Link></li>
                  <li><Link to="extras-comingsoon.html">Coming Soon</Link></li>
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
                <Link to="index.html" className="logo"><img src={LOGO_URL} height={20} alt="logo" /></Link>
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
                  <Link className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown" to="#" role="button" aria-haspopup="false" aria-expanded="false">
                    <i className="mdi mdi-email-outline noti-icon" />
                    <span className="badge badge-danger badge-pill noti-icon-badge">5</span>
                  </Link>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-menu-lg">
                    {/* item*/}
                    <div className="dropdown-item noti-title">
                      <span className="badge badge-danger float-right">367</span>
                      <h5>Messages</h5>
                    </div>
                    <div className="slimscroll" style={{ maxHeight: 230 }}>
                      {/* item*/}
                      <Link to="/" className="dropdown-item notify-item">
                        <div className="notify-icon"><img src="/assets/images/users/user-2.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                        <p className="notify-details"><b>Charles M. Jones</b><span className="text-muted">Dummy text of the printing and typesetting industry.</span></p>
                      </Link>
                      {/* item*/}
                      <Link to="/" className="dropdown-item notify-item">
                        <div className="notify-icon"><img src="/assets/images/users/user-3.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                        <p className="notify-details"><b>Thomas J. Mimms</b><span className="text-muted">You have 87 unread messages</span></p>
                      </Link>
                      {/* item*/}
                      <Link to="/" className="dropdown-item notify-item">
                        <div className="notify-icon"><img src="/assets/images/users/user-4.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                        <p className="notify-details">Luis M. Konrad<span className="text-muted">It is a long established fact that a reader will</span></p>
                      </Link>
                      {/* item*/}
                      <Link to="/" className="dropdown-item notify-item">
                        <div className="notify-icon"><img src="/assets/images/users/user-5.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                        <p className="notify-details"><b>Kendall E. Walker</b><span className="text-muted">Dummy text of the printing and typesetting industry.</span></p>
                      </Link>
                      {/* item*/}
                      <Link to="/" className="dropdown-item notify-item">
                        <div className="notify-icon"><img src="/assets/images/users/user-6.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                        <p className="notify-details"><b>David M. Ryan</b><span className="text-muted">You have 87 unread messages</span></p>
                      </Link>
                    </div>
                    {/* All*/}
                    <Link to="/" className="dropdown-item notify-all">
                      View All
                    </Link>
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
                    <div className="slimscroll" style={{ maxHeight: 230 }}>
                      {/* item*/}
                      <Link to="/" className="dropdown-item notify-item">
                        <div className="notify-icon bg-primary"><i className="mdi mdi-cart-outline" /></div>
                        <p className="notify-details">Your order is placed<span className="text-muted">Dummy text of the printing and typesetting industry.</span></p>
                      </Link>
                      {/* item*/}
                      <Link to="/" className="dropdown-item notify-item">
                        <div className="notify-icon bg-success"><i className="mdi mdi-message" /></div>
                        <p className="notify-details">New Message received<span className="text-muted">You have 87 unread messages</span></p>
                      </Link>
                      {/* item*/}
                      <Link to="/" className="dropdown-item notify-item">
                        <div className="notify-icon bg-warning"><i className="mdi mdi-martini" /></div>
                        <p className="notify-details">Your item is shipped<span className="text-muted">It is a long established fact that a reader will</span></p>
                      </Link>
                      {/* item*/}
                      <Link to="/" className="dropdown-item notify-item">
                        <div className="notify-icon bg-danger"><i className="mdi mdi-message" /></div>
                        <p className="notify-details">New Message received<span className="text-muted">You have 87 unread messages</span></p>
                      </Link>
                      {/* item*/}
                      <Link to="/" className="dropdown-item notify-item">
                        <div className="notify-icon bg-info"><i className="mdi mdi-martini" /></div>
                        <p className="notify-details">Your item is shipped<span className="text-muted">It is a long established fact that a reader will</span></p>
                      </Link>
                    </div>
                    {/* All*/}
                    <Link to="/" className="dropdown-item notify-all">
                      View All
                    </Link>
                  </div>
                </li>
                <li className="list-inline-item dropdown notification-list">
                  <a className="nav-link dropdown-toggle arrow-none waves-effect nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                    <img src="/assets/images/users/user-1.jpg" alt="user" className="rounded-circle" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown ">
                    <a className="dropdown-item" href="#"><i className="mdi mdi-account-circle m-r-5 text-muted" /> Profile</a>
                    <a className="dropdown-item" href="#"><span className="badge badge-success mt-1 float-right">5</span><i className="mdi mdi-settings m-r-5 text-muted" /> Settings</a>
                    <Link className="dropdown-item" to="/admin/change-password" > <i className="mdi mdi-lock-open-outline m-r-5 text-muted" /> Change Password</Link>

                    <a className="dropdown-item" href="#" onClick={Logout}><i className="mdi mdi-logout m-r-5 text-muted" /> Logout</a>
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
                      <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                      <li className="breadcrumb-item"><Link to="#">Pages</Link></li>
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