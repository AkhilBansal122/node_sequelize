// PageContent.js
import React from 'react';
import { Link } from 'react-router-dom';

const PageContent = ({pageContents}) => {
  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="float-right page-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={pageContents.LinkTo ?? '#' }>{pageContents.breadcrumbitem}</Link></li>
            <li className="breadcrumb-item"><Link to={pageContents.LinkTo ?? '#' }>{pageContents.breadcrumbitems}</Link></li>
            <li className="breadcrumb-item active">{pageContents.breadcrumbitemActive}</li>
          </ol>
        </div>
        <h5 className="page-title">{pageContents.pageTitle}</h5>
      </div>
    </div>
  );
};

export default PageContent;
