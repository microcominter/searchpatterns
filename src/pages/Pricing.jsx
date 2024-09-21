import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Pricing() {
  return (
    <>
    <Navbar/>
      <div id="priceing" className="pricing-content section-padding">
        <div className="container">
          <div className="section-title text-center pb-5 pt-5">
            <h2>Plans & Pricing </h2>
            <p className="text-white"style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px',fontSize:'22px'}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
          </div>
          <div className="row text-center mt-5">
            <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp mt-2" data-wow-duration="1s" data-wow-delay="0.1s" data-wow-offset="0" style={{ visibility: "visible", animationDuration: "1s", animationDelay: "0.1s", animationName: "fadeInUp" }}>
              <div className="pricing_design">
                <div className="single-pricing">
                  <div className="price-head">
                    <h2>Individual</h2>
                    <span><i className="bi bi-check2"></i> 1 User </span><br />
                    <span><i className="bi bi-check2"></i> 100 searches per day </span><br />
                    <span><i className="bi bi-check2"></i> CPC and search volume data </span>
                    <h1>$5</h1>
                    <p style={{fontFamily:'gilroy',fontSize:'20px',textAlign:'left'}}>/Monthly</p>
                  </div>
                  <ul>
                    <li>Entrepreneurs, consultants & small businesses who need fast data to create solid strategies and impactful data presentation.</li>
                   
                  </ul>
                  <div className="pricing-price">

                  </div>
                  <a href="#" className="price_btn">Buy Now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp mt-2" data-wow-duration="1s" data-wow-delay="0.2s" data-wow-offset="0" style={{ visibility: "visible", animationDuration: "1s", animationDelay: " 0.2s", animationName: "fadeInUp" }}>
              <div className="pricing_design">
                <div className="single-pricing" style={{padding: '50px 25px 49px'}}>
                  <div className="price-head">
                    <h2>Pro</h2>
                    <span><i className="bi bi-check2"></i> Up to 3 users </span><br />
                    <span><i className="bi bi-check2"></i> Unlimited searches per day</span> <br />
                    <span><i className="bi bi-check2"></i> CPC and search volume data </span>
                    <h1 className="price">$49</h1>
                    <p style={{fontFamily:'gilroy',fontSize:'20px',textAlign:'left'}}>/Monthly</p>
                  </div>
                  <ul>
                    <li>Teams that monitor different business searches and need to integrate information for strategy and presentation.</li>
                    
                  </ul>
                  <div className="pricing-price">

                  </div>
                  <a href="#" className="price_btn" >Buy Now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp mt-2" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0" style={{ visibility: "visible", animationDuration: "1s", animationDelay: "0.3s", animationName: " fadeInUp" }}>
              <div className="pricing_design">
                <div className="single-pricing" style={{padding: '50px 25px 49px'}}>
                  <div className="price-head">
                    <h2>Expert</h2>
                    <span><i className="bi bi-check2"></i> 1 Unlimited users </span><br />
                    <span><i className="bi bi-check2"></i> Unlimited searches per day </span><br />
                    <span><i className="bi bi-check2"></i> CPC and search volume data </span>
                    <h1 className="price">$99</h1>
                    <p style={{fontFamily:'gilroy',fontSize:'20px',textAlign:'left'}}>/Monthly</p>
                  </div>
                  <ul>
                    <li>For teams that care about tracking & monitoring their brand reputation or want to keep their finger on the pulse for content inspiration.</li>
                    
                  </ul>
                  <div className="pricing-price">

                  </div>
                  <a href="#" className="price_btn">Buy Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Pricing;