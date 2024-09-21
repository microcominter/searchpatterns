import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import gif from "../assets/images/source.gif";
function Feature() {
  return (
    <>
    <Navbar/>
      <section id="feature">
        <div className="container first">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <h5 className="text-white">Search <span>Listening</span> Alerts</h5>
              <p className="lead">A pro only feature that let's you get weekly emails showing you how search behaviour has changed, for a keyword or phrase you’re tracking in Search Patterns. Search data is only ever a ‘moment in time’. To get a true understanding of how people think and feel, behaviour needs to be closely monitored.</p>
            </div>
          </div>
        </div>
        <div className="container secound">
          <div className="row">
            <div className="col-md-12">
              <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div class="col-10 col-sm-8 col-lg-6">
                  <img src={gif} class="d-block mx-lg-auto img-fluid border rounded" alt="Bootstrap Themes" width="400" height="200" loading="lazy" />
                </div>
                <div class="col-lg-6">
                  <h1 class="display-4  mb-5"  style={{fontFamily:'denton', fontWeight:'700', opacity:'1',fontSize:'60px'}}>Monitor & get Alerted to new suggestions.</h1>
                  <p class="lead" style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px',fontSize:'22px'}}>Track shifts in brand perceptions, spot seasonal trends and be first to answer new, emerging topics.</p>
                  <p class="lead" style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px',fontSize:'22px'}}>Setup Search Listening Alerts and automatically get weekly email digests showing what new questions are being asked around any topic.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container  third">
          <h1 className="text-center text-white"  style={{fontFamily:'denton', fontWeight:'700', opacity:'1',fontSize:'60px'}}>How teams are using search listening…</h1>
          <div className="row">
            <div className="col-md-4 my-2">
              <i class="bi bi-funnel icon"></i>
              <h3 className="text-white"style={{fontFamily:'gilroy',opacity:'1',letterSpacing: '0.5px',fontSize:'28px'}}>Brand Reputation</h3>
              <p className="lead text-right" style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px',fontSize:'20px'}}>Be notified about any new searches around you, your brand, your organisation...or even a product. Be ready to react when anything - whether it’s negative or positive - changes.</p>
            </div>
            <div className="col-md-4 my-2">
              <i class="bi bi-clipboard2-pulse icon"></i>
              <h3 className="text-white" style={{fontFamily:'gilroy',opacity:'1',letterSpacing: '0.5px',fontSize:'28px'}}>Competitor Analysis</h3>
              <p className="lead text-right"style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px',fontSize:'20px'}}>Track your competitors by setting up alerts for their brand or product names, and keep an eye on what’s going on in their world.</p>
            </div>
            <div className="col-md-4 my-2">
              <i className="bi bi-person-fill-gear icon"></i>
              <h3 className="text-white" style={{fontFamily:'gilroy',opacity:'1',letterSpacing: '0.5px',fontSize:'28px'}}>Reactive Content</h3>
              <p className="lead text-right"style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px',fontSize:'20px'}}>React to people’s ever changing questions around your brand, product or service. Get alerted to new queries relevant to you, and create new content that helps people when they need it.</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-4 my-2">
              <i class="bi bi-gem icon"></i>
              <h3 className="text-white" style={{fontFamily:'gilroy',opacity:'1',letterSpacing: '0.5px',fontSize:'28px'}}>SEO insights</h3>
              <p className="lead text-right" style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px',fontSize:'20px'}}>Monitor people's search behaviour around your keywords and adjust your activity when there are changes.</p>
            </div>
            <div className="col-md-4 my-2">
              <i class="bi bi-suitcase-lg icon"></i>
              <h3 className="text-white" style={{fontFamily:'gilroy',opacity:'1',letterSpacing: '0.5px',fontSize:'28px'}}>Stay one step ahead</h3>
              <p className="lead text-right" style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px',fontSize:'20px'}}>Find out how people are talking about your brand, topic, product or category — in real-time, with less effort — and greater thoroughness than ever.</p>
            </div>
          </div>
        </div>
        <div className="container fourth">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 style={{fontFamily:'denton', opacity:'1', fontWeight:'700',fontSize:'60px'}}>Search Listening is the process of understanding what an audience
                truly thinks.</h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-9">
              <h6 className="lead text-white mb-5" style={{fontFamily:'gilroy',opacity:'1', fontWeight:'700',letterSpacing: '0.5px',fontSize:'28px'}}>Use the ultimate source of insight–search data–to see the unbiased perspectives of millions of people.</h6>
            </div>
          </div>

          <div className="row justify-content-between mt-5 ">
            <div className="col-md-3">
              <h4 className="text-right text-white" style={{fontFamily:'gilroy',opacity:'1', fontWeight:'700',letterSpacing: '0.5px',fontSize:'28px'}}>Learn what people <span>really think</span>, not what they say they think</h4>
              <p className="lead text-right text-white" style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px',fontSize:'22px'}}> It’s candid, honest insight, which makes it incredibly valuable...particularly when it comes to making big decisions which truly relate to people.</p>
            </div>
            <div className="col-md-3 ">
              <h4 className="text-right text-white" style={{fontFamily:'gilroy',opacity:'1', fontWeight:'700',letterSpacing: '0.5px',fontSize:'28px'}}>Reduce the potential for <span>flawed data</span></h4>
              <p className="lead text-right text-white" style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px',fontSize:'22px'}}> Search listening is less subjective to unreliable responses, which can happen in surveys and interviews, or the desire to project a certain image rather than reality, which is a risk with social data.</p>
            </div>
            <div className="col-md-3">
              <h4 className="text-right text-white" style={{fontFamily:'gilroy',opacity:'1', fontWeight:'700',letterSpacing: '0.5px',fontSize:'28px'}}>It’s how you listen to what people want, that will  <span>set you apart </span>from the competition.</h4>
              <p className="lead text-right text-white" style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px',fontSize:'22px'}}>Imagine what you’re missing out on if you don’t. Search listening is the insight consumer research needs, now.</p>
            </div>

          </div>

        </div>
        <div className="container-fluid coma mb-5">
          <div className="row">
            <div className="col-md-12">
              <img src="images/coma.png" alt="" className="text-center" />

            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h6 className="text-center">“Google searches are the most important dataset ever collected on the human psyche”</h6>
              <p className="text-center mt-4"  style={{fontFamily:'gilroy',opacity:'0.7',letterSpacing: '0.5px',fontSize:'20px'}}><span className="fw-bold" >Seth Stephens-Davidowitz, </span>Former Google data scientist and author of the book “Everybody Lies”</p>
            </div>
          </div>
        </div>

        <div className="container fifth">
          <div className="row d-flex justify-content-center">
            <div className="col-md-8">
              <h1 className="text-center">Anyone can use Search Patterns to achieve better results</h1>
              <Link to="/"><button className="btn btntff mt-5">Try for free</button> </Link>
              <Link to="/"> <button className="btn btn-outline-primary btnep mt-5">Explore Plan</button></Link>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default Feature;