import { Link } from "react-router-dom";
import logo from '../assets/images/search petterns logo1.png'
import linkdin from "../assets/images/linkedin_145807.png"
import insta from "../assets/images/instagram_1384063.png"
function Footer() {
  return (
    <>
      <footer id="SearchPaternftr">
        {/* <h1 className="text-center text-white pt-5" style={{fontFamily:'denton', fontWeight:'700', opacity:'1', marginTop:'50px',fontSize:'60px'}}>Anyone can use Search Patterns to <br />
          create better content</h1> */}
        <div className="container">
          <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top justify-content-evenly">
            <div className="col mb-6">
              <img src={logo} style={{ width: "300px",paddingBottom:'15px'}} alt="" />
              <h3 className="text-white" style={{ marginLeft:'18px',fontFamily: 'gilroy', opacity:'0.7',marginTop:'0px' ,fontSize:'28px'}}>Need help ? Get in touch</h3>
              <h5 className="" style={{color:'#FA3C00',marginLeft:'18px'}}>support@searchpatterns.in</h5>
              <p className="text-white" style={{ marginLeft:'18px', opacity:'0.7'}}>Follow Us around the web   -</p>
              <div className="socialicons" style={{marginLeft:'12px'}}>
                <a href="#"><img src={linkdin} width="25px" alt="" className="mx-1" /></a>
                <a href="https://www.instagram.com/searchpatterns/"><img src={insta} width="25px" alt="" className="mx-1" /></a>
              </div>
            </div>
            <div className="col mb-3">
            </div>
            <div className="col mb-3">
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><Link to="/consulting" className="nav-link p-0 text-body-secondary">Help center</Link></li>


                <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-body-secondary">Search Listening for Public Relations</Link></li>
                <li className="nav-item mb-2"><Link to="/privacyandpolicy" className="nav-link p-0 text-body-secondary">Privacy</Link></li>
                <li className="nav-item mb-2"><Link to="/termsandconditions" className="nav-link p-0 text-body-secondary">T&Cs</Link></li>
              </ul>
            </div>

            <div className="col mb-3">

              <ul className="nav flex-column">
                <li className="nav-item mb-2"><Link to="/seo" className="nav-link p-0 text-body-secondary">SEO</Link></li>
                <li className="nav-item mb-2"><Link to="/content_marketing" className="nav-link p-0 text-body-secondary">Content Marketing</Link></li>
                <li className="nav-item mb-2"><Link to="/consumer_research" className="nav-link p-0 text-body-secondary">Consumer Research</Link></li>
              </ul>
            </div>
          </footer>
        </div>
        <div className="copyright text-center text-white bg-secondary p-2">
          <p>copyright@SearchPatterns</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;