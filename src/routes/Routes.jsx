import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Seo from '../pages/Seo.jsx';
import Chart from '../components/Chart.jsx';
import Feature from '../pages/Feature.jsx';
import Table from '../components/Table.jsx';
import Contentmarketing from '../pages/ContentMarketing.jsx';
import Consumerresearch from '../pages/ConsumerResearch.jsx';
import Signup from '../pages/Signup.jsx';
import Loader from '../components/Loader.jsx';
import SearchAI from '../pages/AI/SearchAI.jsx';
import FAQ from '../pages/Faq.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';
import PrivacyPolicy from '../pages/PrivacyPolicy.jsx';
import TermsAndConditions from '../pages/TermsConditions.jsx';
import PageTransition from '../components/PageTransition.jsx';
import Discover from '../pages/AI/Discover.jsx';
// import Adposting from '../pages/AI/Adposting.jsx';
import SearchPatterns from '../pages/Searchpatterns/SearchPatterns.jsx';
import { SignIn, SignUp } from '@clerk/clerk-react';

const Home = lazy(() => import('../pages/Home.jsx'));
const Search = lazy(() => import('../pages/Search.jsx'));
const Login = lazy(() => import('../pages/Login.jsx'));
const Pricing = lazy(() => import('../pages/Pricing.jsx'));
const Consulting = lazy(() => import('../pages/Consulting.jsx'));

export default function Routess() {
  const location = useLocation();
  return (
    <Suspense fallback={<Loader />}>
      <ScrollToTop />
      {/* <PageTransition location={location}> */}
        <Routes location={location} key={location.pathname}>
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />

          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/consulting' element={<Consulting />} />
          <Route path='/seo' element={<Seo />} />
          <Route path='/chart' element={<Chart />} />
          <Route path='/searchbox' element={<Search />} />
          <Route path='/content_marketing' element={<Contentmarketing />} />
          <Route path='/consumer_research' element={<Consumerresearch />} />
          <Route path='/feature' element={<Feature />} />.jsx
          <Route path='/table' element={<Table />} />
          <Route path='/loader' element={<Loader />} />
          <Route path='/searchAi/:q' element={<SearchAI />} />
          <Route path='/searchAi/faq' element={<FAQ />} />
          <Route path='/privacyandpolicy' element={<PrivacyPolicy />} />
          <Route path='/termsandconditions' element={<TermsAndConditions />} />
          <Route path='/searchAi/discover' element={<SearchAI />} />
          {/* <Route path='/searchAi/adposting' element={<Adposting />} /> */}
          <Route path='/searchpatterns' element={<SearchPatterns/>}/>


        </Routes>
      {/* </PageTransition> */}
    </Suspense>
  );
}