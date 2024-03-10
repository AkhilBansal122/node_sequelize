import React from "react"

import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageContent from "../components/PageContent";

const Layout = ({ pageContents, mainComponent }) => {
    return (
        <div id="wrapper">
            {/* ========== Left Sidebar Start ========== */}
            <Sidebar />
            {/* Left Sidebar End */}
            {/* Start right Content here */}
            <div className="content-page">
                {/* Start content */}
                <div className="content">
                    {/* Top Bar Start */}
                    <TopBar />
                    {/* Top Bar End */}
                    <div className="page-content-wrapper ">
                        <div className="container-fluid">
                            <PageContent pageContents={pageContents} />
                            {mainComponent}
                        </div>{/* container fluid */}
                    </div> {/* Page content Wrapper */}
                </div> {/* content */}
                <Footer />
            </div>
            {/* End Right content here */}
        </div>
    )
}
export default Layout;