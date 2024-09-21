import React from 'react'
export default function Cards() {
  return (
    <div className="container">
    <div className="row mt-5 d-flex justify-content-evenly">
      <div className="col-md-3 mt-3">
        <div className="card mb-3 service">
          <div className="card-body" style={{fontFamily:'gilroy'}}>
            <i className="bi bi-person-fill-gear icon"></i>
            <h5 className="card-title text-center text-white" style={{fontFamily:'gilroy',letterSpacing: '0.5px'}}>Meet your customers exactly where they are</h5>
            <br />
            <p className="card-text text-center text-white" style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px'}}>Generate uncannily pertinent content that resonates deeply and boosts traffic, downloads, views, and shares.</p>
          </div>
        </div>
      </div>
      <div className="col-md-3 mt-3">
        <div className="card mb-3 service">
          <div className="card-body">
            <i className="bi bi-clipboard-pulse icon"></i>
            <h5 className="card-title text-center text-white" style={{fontFamily:'gilroy',letterSpacing: '0.5px'}}>Stay keenly attuned to the current trends and developments.</h5>
            <br />
            <p className="card-text text-center text-white" style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px'}}>Receive notifications whenever your keyword is discussed in novel contexts. Track trends and analyze shifts in search patterns over time.</p>
          </div>
        </div>
      </div>
      <div className="col-md-3 mt-3">
        <div className="card mb-3 service">
          <div className="card-body">
            <i className="bi bi-database icon"></i>
            <h5 className="card-title text-center text-white" style={{fontFamily:'gilroy',letterSpacing: '0.5px'}}>Uncover hidden treasures</h5>
            <br />
            <p className="card-text text-center text-white" style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px'}}>Unearth unforeseen revelations and obscure niches that enhance organic search and provide your campaigns with a competitive advantage.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-2 d-flex justify-content-evenly">
      <div className="col-md-3 mt-3">
        <div className="card mb-3 service">
          <div className="card-body">
            <i className="bi bi-hourglass-split icon"></i>
            <h5 className="card-title text-center text-white" style={{fontFamily:'gilroy',letterSpacing: '0.5px'}}>Cease squandering time on intuition and speculation.</h5>
            <br />
            <p className="card-text text-center text-white" style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px'}}>Effortlessly populate your content calendar (rapidly) and bid farewell to writer’s block by accessing a plethora of content ideas derived from insightful keyword research.</p>
          </div>
        </div>
      </div>
      <div className="col-md-3 mt-3">
        <div className="card mb-3 service">
          <div className="card-body">
            <i className="bi bi-graph-up-arrow icon"></i>
            <h5 className="card-title text-center text-white" style={{fontFamily:'gilroy',letterSpacing: '0.5px'}}>Make sound business judgments: reduce exposure to risk.</h5>
            <br />
            <p className="card-text text-center text-white" style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px'}}>Gain real-time access to what individuals are searching on Google and leverage search data to make daring decisions that drive business growth.</p>
          </div>
        </div>
      </div>
      <div className="col-md-3 mt-3">
        <div className="card mb-3 service">
          <div className="card-body">
            <i className="bi bi-funnel icon"></i>
            <h5 className="card-title text-center text-white" style={{fontFamily:'gilroy',letterSpacing: '0.5px'}}>Optimize your content creation process.</h5>
            <br />
            <p className="card-text text-center text-white" style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px'}}>Discover content concepts without the need to manually sort through individual keywords. Save significant amounts of time, spanning days or even weeks.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
