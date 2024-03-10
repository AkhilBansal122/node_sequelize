import React from "react"

const Home = () => {
  return (

    <div className="row">
      <div className="col-xl-3 col-md-6">
        <div className="card mini-stat m-b-30">
          <div className="p-3 bg-primary text-white">
            <div className="mini-stat-icon">
              <i className="mdi mdi-cube-outline float-right mb-0" />
            </div>
            <h6 className="text-uppercase mb-0">New Orders</h6>
          </div>
          <div className="card-body">
            <div className="border-bottom pb-4">
              <span className="badge badge-success"> +11% </span> <span className="ml-2 text-muted">From previous period</span>
            </div>
            <div className="mt-4 text-muted">
              <div className="float-right">
                <p className="m-0">Last : 1325</p>
              </div>
              <h5 className="m-0">1456<i className="mdi mdi-arrow-up text-success ml-2" /></h5>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6">
        <div className="card mini-stat m-b-30">
          <div className="p-3 bg-primary text-white">
            <div className="mini-stat-icon">
              <i className="mdi mdi-account-network float-right mb-0" />
            </div>
            <h6 className="text-uppercase mb-0">New Users</h6>
          </div>
          <div className="card-body">
            <div className="border-bottom pb-4">
              <span className="badge badge-success"> +22% </span> <span className="ml-2 text-muted">From previous period</span>
            </div>
            <div className="mt-4 text-muted">
              <div className="float-right">
                <p className="m-0">Last : 3426</p>
              </div>
              <h5 className="m-0">3567<i className="mdi mdi-arrow-up text-success ml-2" /></h5>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6">
        <div className="card mini-stat m-b-30">
          <div className="p-3 bg-primary text-white">
            <div className="mini-stat-icon">
              <i className="mdi mdi-tag-text-outline float-right mb-0" />
            </div>
            <h6 className="text-uppercase mb-0">Average Price</h6>
          </div>
          <div className="card-body">
            <div className="border-bottom pb-4">
              <span className="badge badge-danger"> -02% </span> <span className="ml-2 text-muted">From previous period</span>
            </div>
            <div className="mt-4 text-muted">
              <div className="float-right">
                <p className="m-0">Last : 15.8</p>
              </div>
              <h5 className="m-0">14.5<i className="mdi mdi-arrow-down text-danger ml-2" /></h5>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6">
        <div className="card mini-stat m-b-30">
          <div className="p-3 bg-primary text-white">
            <div className="mini-stat-icon">
              <i className="mdi mdi-cart-outline float-right mb-0" />
            </div>
            <h6 className="text-uppercase mb-0">Total Sales</h6>
          </div>
          <div className="card-body">
            <div className="border-bottom pb-4">
              <span className="badge badge-success"> +10% </span> <span className="ml-2 text-muted">From previous period</span>
            </div>
            <div className="mt-4 text-muted">
              <div className="float-right">
                <p className="m-0">Last : 14256</p>
              </div>
              <h5 className="m-0">15234<i className="mdi mdi-arrow-up text-success ml-2" /></h5>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default Home;