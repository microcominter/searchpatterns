import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Seo() {
  return (
    <>
    <Navbar/>
      <section id="seo">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-8">
              <h1 className="text-center">A tool for <span>SEO</span> teams to monitor and analyze search trends.  </h1>
              <p className="mt-5 text-center">It gathers, monitors, and notifies you about key questions being searched on Google.</p>
              <Link to="/"><button className="btn btntff mt-5">Try for free</button> </Link>
              <Link to="#"> <button className="btn btn-outline-primary btnep mt-5">Explore Plan</button></Link>
            </div>
          </div>
        </div>

        <div className="container my-5 hero">
          <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center">
            <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
              <p className="lead">"The greatest advantage of Search Patterns is the valuable insight into the types of questions people are asking Google about a particular topic. For our work with voice search and voice assistant apps, instead of starting without direction, we have the actual search queries. This allows us to design conversations and pre-construct complete frameworks in advance."</p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              </div>
            </div>
            <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
              <img className="rounded-lg-3" src="images/hero.png" alt="" style={{ width: "720", marginBottom: "40px" }} />
            </div>
          </div>
        </div>

        <div className="container first">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <img src="images/coma.png" alt="" />
              <h2 className="text-center">“There are 3.5 billion Google searches every day, and 20% of those have never been seen before. They’re like a direct line to people’s thoughts…”
              </h2>
              <p className="text-center mt-4">Source: <Link> internetlivestats.com</Link></p>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-5 customerlogo">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <h2 className="text-white text-center mb-5">Every month 20,000+ companies do awesome things with Search Patterns</h2>
            </div>
          </div>

          <div className="row justify-content-center ">
            <div className="col-md-2"><img src="images/logo1.svg" alt="" className="mt-3" /> </div>
            <div className="col-md-2"> <img src="images/logo2.svg" alt="" style={{ marginTop: "8px" }} className="mt-4" /></div>
            <div className="col-md-2" > <img src="images/logo1.png" style={{ width: "50%" }} className="ms-5" alt="" /></div>
            <div className="col-md-2"><img src="images/logo2.png" alt="" style={{ width: "80%" }} className="mt-4" /></div>
          </div>
        </div>

        <div className="container my-5  dis">
          <div className="row p-4 pb-0 pe-md-0 pt-md-5 align-items-center rounded-3  shadow-md">
            <div className="col-md-7 p-3 p-md-5 pt-md-3">
              <p className="lead" style={{opacity:'1'}}>"Our website contains a lot of scattered information about living donation, but I was able to gather all the questions people are asking and identify what was missing on our site. This process was incredibly significant and would have taken me days or weeks with another SEO tool."
              </p>
            </div>
            <div className="col-md-4 offset-md-1 p-0 overflow-hidden shadow-md">
              <img className="rounded-md-3 mt-3" src="images/busm.jpeg" alt="" style={{ width: "720" }} />
            </div>
          </div>
        </div>


        <div className="container secound">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <h2 className="text-center text-white">
                Search Listening involves comprehending the genuine thoughts of an audience.</h2>
              <p className="text-center mt-5 mb-5">Leverage search data, the ultimate source of insight, to uncover the unbiased perspectives of millions.</p>
            </div>
          </div>
          <div className="row justify-content-between mt-5">
            <div className="col-md-3">
              <h3 className="text-white">Gain insight into people's genuine opinions, not just their stated beliefs.</h3>
              <p>It provides candid, truthful insights, rendering it immensely valuable, especially when considering the individuals behind the search queries.</p>
            </div>
            <div className="col-md-3">
              <h3 className="text-white">
                Minimize the risk of erroneous data.</h3>
              <p>Search listening is less prone to unreliable responses compared to surveys or social data, where there's a risk of respondents wanting to project a certain image rather than expressing reality.</p>
            </div>
            <div className="col-md-3">
              <h3 className="text-white">What sets you apart from competitors is how you interpret people's desires and preferences.</h3>
              <p>Consider what opportunities you might overlook without it. Search listening is the essential insight for SEO today.</p>
            </div>
          </div>
        </div>

        <div className="container first mt-5">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <img src="images/coma.png" alt="" />
              <h2 className="text-center">"Google searches represent the most significant dataset ever amassed on the human psyche."
              </h2>
              <p className="text-center pt-4 mb-5">"Seth Stephens-Davidowitz, <Link> a former data scientist at Google and author of the book 'Everybody Lies'..."</Link></p>

              <h4 className="text-center">Combining your ideas with our search listening tool simplifies the process of crafting a content strategy that dominates the SERPs.</h4>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
      -
    </>
  );
}

export default Seo;