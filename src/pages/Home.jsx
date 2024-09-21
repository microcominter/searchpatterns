import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../components/Cards.jsx";
import Navbar from "../components/Navbar.jsx";
import { Suspense, lazy } from "react";
import Loader from "../components/Loader.jsx";
import videoFile from "../assets/videos/hero-desktop.mp4";
import Login from '../pages/Login.jsx'
import '../assets/css/search.css'
import Signin from "../components/Signin.jsx";
import { useAuth } from "@clerk/clerk-react";
const Footer = lazy(() => import(
    '../components/Footer'));

function Home() {
    const {getToken}=useAuth();
    const formRef = useRef(null);
    const [isLoginVisible, setIsLoginVisible] = useState(false);

  const handleLoginClick = () => {
    setIsLoginVisible(true);
  };

  const handleCloseModal = () => {
    setIsLoginVisible(false);
  };

    return (
        <>
            <Navbar onLoginClick={handleLoginClick} />
            <section id="home">
                <div id="search" className={isLoginVisible ? 'blur-background' : ''}>
                    <video autoPlay muted loop id="background-video">
                        <source src={videoFile} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="search-container">
                        <h1 style={{left:'255px',marginTop:'45px'}}>Building bridges in the <span>digital</span> landscape...</h1>
                        <div className="container">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-10">
                                    <div className="card">
                                        <div className="row justify-content-center pt-0 pb-0">
                                            <div className="col-md-8">
                                                <Link to="/searchbox">
                                                    <button className="btn btn-success form-control start_btn">Get Started  <i className="bi bi-arrow-right fw-bold"></i></button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Suspense fallback={<Loader />}>
                    <div className="container-fluid text-center first">
                        <div className="row justify-content-center">
                            <div className="col-md-8 mt-5">
                                <h1 style={{ fontFamily: 'denton', fontWeight: '700', opacity: '1' }}>Receive Immediate,<span>Unfiltered Search Intel</span> , Straight from Your Customer's <span>Thoughts</span> </h1>
                                <p className="mt-5">Every day, 3 billion searches happen on Google, and 20% of them are entirely new. These searches offer a direct glimpse into your customers' minds...</p>
                                <h4 className="text-white">At times, it's as simple as 'How to fix a paper jam,' while other moments unveil their deepest fears and hidden desires, confided only in the sanctum of Google.</h4>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid text-center third">
                        <div className="row justify-content-center" style={{ marginTop: '100px' }}>
                            <div className="col-md-8">
                                <h1 className="mt-5" style={{ fontFamily: 'denton', fontWeight: '700' }}>Uncover a Hidden <span>Treasure</span> Trove of Content Inspiration</h1>
                                <p className="mt-5">Search Patterns delves into autocomplete data from search engines like Google, rapidly producing every pertinent phrase and inquiry people are posing around your keyword.</p>
                                <p className="mt-5">It's a rich source of consumer understanding that you can leverage to develop innovative, highly valuable content, products, and services. Exactly what your customers are seeking.</p>
                            </div>
                        </div>
                    </div>
                </Suspense>

                <div className="container-fluid text-center third mt-5">
                    <div className="row justify-content-center" style={{ marginTop: '100px' }}>
                        <div className="col-md-8">
                            <h1 className="mt-2 mb-5" style={{ fontFamily: 'denton', fontWeight: '700' }}>"<span>Google</span> searches represent the most significant dataset ever amassed on the <span>human mind.</span>"</h1>
                            <h1 className="mt-5 mb-5" style={{ fontFamily: 'denton', fontWeight: '700' }}>Every Month <span>20,000+ </span> Companies Do Awesome Things With <span>Search Patterns</span></h1>
                        </div>
                    </div>
                </div>

                <div className="container-fluid mt-5 customerlogo">
                    <div className="row justify-content-center">
                        <div className="col-md-2"><img src="images/logo1.svg" alt="" /></div>
                        <div className="col-md-2"> <img src="images/logo2.svg" alt="" style={{ marginTop: "8px" }} /></div>
                        <div className="col-md-2"><img src="images/logo1.png" style={{ width: "50%" }} className="ms-5" alt="" /></div>
                        <div className="col-md-2"><img src="images/logo2.png" alt="" style={{ width: "80%" }} className="mt-4" /></div>
                    </div>
                </div>
                <Cards />
            </section>
            {isLoginVisible && (
                <div className="modal-overlay" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        width: '90%',
                        maxWidth: '500px',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        position: 'relative'
                    }}>
                        <button onClick={handleCloseModal} className="close-modal" style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer'
                        }}>×</button>
                        <Signin handleCloseModal={handleCloseModal} />
                    </div>
                </div>
            )}
            <Suspense fallback={<Loader />}>
                <Footer />
            </Suspense>
        </>
    );
}

export default Home;
