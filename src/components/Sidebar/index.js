import react from "react";
import { Link } from "react-router-dom";

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
  );
};

export default Sidebar;