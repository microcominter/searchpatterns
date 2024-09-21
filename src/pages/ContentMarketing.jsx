import { Link } from "react-router-dom";
import avatar from "../assets/images/avatar.avif";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
function Contentmarketing() {
  return (
    <>
    <Navbar/>
      <section id="seo">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              <h1 className="text-center">"A <span>Search monitoring, insight, intelligence, and analytics </span> tool designed for Content Marketing."  </h1>
              <p className="mt-5 text-center">It collates, tracks and alerts you to the important questions being asked on Google. </p>
              {/* <Link to="/"><button className="btn btntff mt-5">Try for free</button> </Link>
              <Link to="#"> <button className="btn btn-outline-primary btnep mt-5">Explore Plan</button></Link> */}
            </div>
          </div>
        </div>

        <div className="container my-5 hero">
          <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center justify-content-evenly">
            <div className="col-md-7 p-3 p-lg-5 pt-lg-3">
              <p className="lead"> <span style={{color:'#FA3C00',opacity:'1',fontWeight:'700px'}}> "Search Patterns"</span> has become my go-to tool for both everyday tasks and in-depth research. It adapts to my unique patterns, providing personalized responses that feel tailored just for me. Whether I'm working on a project, seeking quick information, or needing research help, it delivers accurate answers promptly. It handles high query volumes effortlessly and keeps improving with user feedback. Although it currently supports one language, its future promises multilingual capabilities. "Search Patterns " is my intelligent, adaptable, and reliable assistant, perfect for all my needs. </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              </div>
            </div>
            <div className="col-md-4 offset-lg-1 p-0 ">
              <img className="rounded-lg-3" src={avatar} alt="" style={{ width: "320px", marginBottom: "40px" }} />
              <h3>Ann Handley</h3>
              <p style={{textAlign:'left'}}>Digital marketing & content expert <a href="" style={{color:'#FA3C00'}}>annhandley.com</a></p>
            </div>
          </div>
        </div>

        <div className="container first">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <img src="images/coma.png" alt="" />
              <h2 className="text-center">"Google, where 3.5 billion searches ignite trends, accessing 1.7 billion sites daily, shaping global strategies with mobile and voice queries." 
              </h2>
              {/* <p className="text-center mt-4">Source: <Link> internetlivestats.com</Link></p> */}
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
              <p className="lead">"
                I utilize Search Patterns to refine my approach. After gathering extensive data from Keyword Planner, I turn to Search Patterns to shape the narrative of my blog posts. It's user-friendly and guides me in the right direction, streamlining the content creation process. Clients who previously handled their content internally now turn to us for assistance."</p>
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
                Search Listening involves grasping the genuine sentiments of an audience.</h2>
              <p className="text-center mt-5 mb-5">Utilize search data, the paramount wellspring of insight, to discern the impartial viewpoints of millions of individuals.</p>
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

              <h4 className="text-center">"With your insights and our tailored search listening tool, crafting content that resonates with your audience becomes seamless." </h4>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default Contentmarketing;