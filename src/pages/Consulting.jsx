import React, { useState } from 'react';
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import site from "../../src/assets/images/site-audit.gif"
import quit from "../../src/assets/images/quits.gif"
// import action from "../../src/assets/images/action plan.gif"

const sections = [
  { title: 'SEO (Search Engine Optimization)', content: 'AI enhances content quality and accuracy for SEO.' },
  { title: 'Content Marketing', content: 'AI creates shareable content aligned with user interests.' },
  { title: 'Paid Media', content: 'AI optimizes targeted ad campaigns for clear ROI.' },
  { title: 'CRO (Conversion Rate Optimization)', content: 'AI improves engagement and conversion paths dynamically.' },
  { title: 'Email Marketing', content: 'AI personalizes emails for engagement and sales optimization.' },
  { title: 'Social Media', content: 'AI boosts reach and engagement through personalized content.' },
  { title: 'Analytics', content: 'AI uses data to optimize performance and user satisfaction.' },
  { title: 'Programmatic', content: 'AI automates ad placements based on user behavior.' },
  { title: 'Strategy ', content: 'AI aligns with strategies for data-driven marketing success. ' },
];

function Consulting() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <section id="consult">
        <div className="content">
          <div className="container">
            <div className="row justify-content-evenly">
              <div className="col-md-6 mr-auto left" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <h2 className="mb-3 text-white">See How We Can Get You <span>More</span> Traffic</h2>
                {sections.map((section, index) => (
                  <div key={index} className="hpara">
                    <h4 
                      className="text-white d-flex align-items-center" 
                      onClick={() => handleToggle(index)} 
                      style={{ fontFamily: 'gilroy', letterSpacing: '0.5px', cursor: 'pointer' }}
                    >
                      {activeIndex === index ? <FaChevronUp style={{ marginRight: '10px' }} /> : <FaChevronDown style={{ marginRight: '10px' }} />}
                      {section.title}
                    </h4>
                    {activeIndex === index && (
                      <p 
                        className="text-white" 
                        style={{ fontFamily: 'gilroy', opacity: '0.7', letterSpacing: '0.5px', fontSize: '18px' }}
                      >
                        {section.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="col-md-6">
                <div className="box" id='box-form'>
                  <h3 className="heading" style={{ fontFamily: 'gilroy', letterSpacing: '0.5px', fontSize: '25px' }}>Let's Grow Your Traffic!</h3>
                  <form className="mb-5" method="post" id="contactForm" name="contactForm">
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label htmlFor="name" className="col-form-label">Name *</label>
                        <input type="text" className="form-control" name="name" id="name" placeholder="Your name" />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="websiteurl" className="col-form-label">Website URL</label>
                        <input type="text" className="form-control" name="websiteurl" id="websiteurl" placeholder="Website URL" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <label htmlFor="email" className="col-form-label">Email *</label>
                        <input type="text" className="form-control" name="email" id="email" placeholder="Your email address" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <label htmlFor="message" className="col-form-label">Project Description *</label>
                        <textarea className="form-control" name="message" id="message" cols="30" rows="7"></textarea>
                      </div>
                    </div>
                    {/* <div className="row mb-3">
                      <div className="col-md-6 form-group">
                        <label htmlFor="budget" className="col-form-label">Budget</label>
                        <select className="custom-select" id="budget" name="budget">
                          <option selected>Choose...</option>
                          <option value="$1000 below"> $1,000</option>
                          <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                          <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                          <option value="$15,000 - $25,000">$15,000 - $25,000</option>
                          <option value="$25,000 >">$25,000</option>
                        </select>
                      </div>
                    </div> */}
                    <div className="row justify-content-center">
                      <div className="col-md-12 btn mt-5">
                        <button className="btn btn-success">Get in touch with</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-5 customerlogo">
          <h3 className="text-white text-center mb-5" style={{ fontFamily: 'denton', fontWeight: '700', opacity: '1', fontSize: '60px' }}>Join Over <span>1K Companies</span><br /> from Small Business to Enterprise</h3>
          <div className="row justify-content-center">
            <div className="col-md-2"><img src="images/logo1.svg" alt="" className="mt-3" /> </div>
            <div className="col-md-2"> <img src="images/logo2.svg" alt="" style={{ marginTop: "8px" }} className="mt-4" /></div>
            <div className="col-md-2"> <img src="images/logo1.png" style={{ width: "50%" }} className="ms-5" alt="" /></div>
            <div className="col-md-2"><img src="images/logo2.png" alt="" style={{ width: "80%" }} className="mt-4" /></div>
          </div>
        </div>
        <div className="container">
  <h2 className="text-center text-white mt-5 mb-5" style={{ fontFamily: 'denton', fontWeight: '700', opacity: '1', fontSize: '60px' }}>
    Book a Call to Get Your <br /> Custom Strategy
  </h2>
    <div className="col-md-12 order-1 mt-5" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
    <div className="col-md-3" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <img src={site} alt="" style={{width:'250px'}} />
      <h3 className="text-white text-center mt-5" style={{ fontFamily: 'gilroy', opacity: '1', letterSpacing: '0.5px' }}>Site Audit</h3>
      </div>
      <div  className="col-md-8">
      <p className="text-justify fs-5 text-white" style={{ fontFamily: 'gilroy', opacity: '0.7', letterSpacing: '0.5px',textAlign:'justify' }}>
        Site Audit involves a comprehensive analysis of your website, industry landscape, and competitors to identify growth opportunities and enhance your online presence. By evaluating your site's performance metrics, user experience, and SEO effectiveness, we pinpoint areas for improvement and strategic adjustments. We also assess industry trends, consumer behavior insights, and competitor strategies to benchmark against best practices and leverage untapped potential. This holistic approach empowers you with actionable insights to optimize your digital strategy, strengthen market position, and capitalize on emerging opportunities, ensuring your business stays competitive and adaptive in a dynamic online environment.
      </p>
      </div>
    </div>
    <div className="col-md-12 order-2 mt-5" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div  className="col-md-8">
      <p className="text-justify fs-5 text-white" style={{ fontFamily: 'gilroy', opacity: '0.7', letterSpacing: '0.5px',textAlign:'justify' }}>
        "We provide detailed pricing estimates that outline the costs associated with your project, ensuring transparency and clarity. Additionally, we establish clear timelines, outlining key milestones and delivery schedules. This approach allows you to budget effectively and plan accordingly, ensuring that expectations are managed from the outset. By providing comprehensive cost breakdowns and timelines, we aim to foster trust and accountability while enabling you to make informed decisions about your project's progression and investment."
      </p>
      </div>
      <div className="col-md-3" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <img src={quit} alt="" style={{width:'250px'}} />
      <h3 className="text-white text-center mt-5" style={{ fontFamily: 'gilroy', opacity: '1', letterSpacing: '0.5px' }}>Quote</h3>
      </div>
    </div>
    <div className="col-md-12 order-3 mt-5" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
    <div className="col-md-3" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {/* <img src={action} alt="" style={{width:'250px'}} /> */}
      <h3 className="text-white text-center mt-5" style={{ fontFamily: 'gilroy', opacity: '1', letterSpacing: '0.5px' }}>Action plan</h3>
      </div>
      <div  className="col-md-8">
      <p className="text-justify fs-5 text-white" style={{ fontFamily: 'gilroy', opacity: '0.7', letterSpacing: '0.5px',textAlign:'justify' }}>
        "Receive a detailed action plan outlining strategic steps to achieve your goals. Our approach involves thorough analysis of your objectives, current status, and market conditions. We develop customized strategies focusing on key areas such as digital marketing, content creation, and audience engagement. This plan includes specific tasks, timelines, and performance metrics to track progress effectively. By aligning actions with your goals, we ensure a structured path towards success, enabling adaptability and continuous improvement. Our goal is to empower you with a clear roadmap for achieving milestones and driving sustainable growth in your business."
      </p>
      </div>
    </div>
  <div className="row justify-content-center">
    <div className="col-md-12 btne mt-5">
      <p className='text-white' style={{textDecoration:'underline', letterSpacing:'0.5px'}}>For the further queries share the email and our team will reach you.</p>
      <a href="#box-form"><button className="btn text-white fw-bold mt-3">Get in touch with</button></a>
    </div>
  </div>
</div>

      </section>
      <Footer />
    </>
  );
}

export default Consulting;
