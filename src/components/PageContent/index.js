// PageContent.js
import React from 'react';
import { Link } from 'react-router-dom';

const PageContent = () => {
  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="float-right page-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="#">Home</Link></li>
            <li className="breadcrumb-item"><Link to="#">Dashboard</Link></li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </div>
        <h5 className="page-title">Admin Dashboard</h5>
      </div>
    </div>
  );
};

export default PageContent;
