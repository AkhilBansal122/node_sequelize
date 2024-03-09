import react from "react";

const Sidebar = () => {
  return (
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
  );
};

export default Sidebar;