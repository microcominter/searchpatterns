import React, { useState, useContext, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTv } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { GoTable } from "react-icons/go";
import { FaChartPie } from "react-icons/fa";
import { IoMicOutline } from "react-icons/io5";
import '../../assets/css/searchpatterns.css';
import Sidebar from '../../components/Searchpatterns/Sidebar.jsx';
import Chat from './Chat.jsx';
import Table from '../../components/Searchpatterns/Table.jsx';
import { SearchContext } from '../../contextApi/SearchContext.jsx';
import { setCurrentChatId, setIsChat, setPrompt } from '../../slices/query.js';
import Chart from "../../components/Chart.jsx";
import { renderChart } from "../../utils/renderChart.js";
import Loader from '../../components/Loader.jsx';
import { CiViewTable } from "react-icons/ci";
import SearchAI from '../AI/SearchAI.jsx';
import { ArrowLeft } from 'lucide-react';
import { fetchInfo } from '../../services/operations/searchaiAPI.js';
import { motion } from 'framer-motion';
import { SignedIn, useAuth, UserButton, useUser } from '@clerk/clerk-react';

export default function SearchPatterns() {
  const [view, setView] = useState('table'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isChat, setIsChats] = useState(false); 
  const [activeTab, setActiveTab] = useState('questions');
  const [activeButton, setActiveButton] = useState('searchPatterns'); // New state for active button
  const { getToken }=useAuth();
  const [chartRefs, setChartRefs] = useState({
    questions: useRef(null),
    prepositions: useRef(null),
    comparisons: useRef(null)
  });
  const [chatTitle, setChatTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [chatprompt,setChatprompt]=useState("");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [inputText, setInputText] = useState('');

  const { chartRef, prepositionChartRef, comparisonChartRef,handleInputChange, handleSubmit, query } = useContext(SearchContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useCustomPrompt = useSelector((state) => state.searchdata.useCustomPrompt);
  const inputRef = useRef(null);
  const suggestions = useSelector((state) => state.searchdata.suggestions);
  const prepositions = useSelector((state) => state.searchdata.prepositions);
  const comparisons = useSelector((state) => state.searchdata.comparisons);
  const chartsLoaded = useSelector((state) => state.searchdata.chartsLoading);
  const prompt=useSelector((state)=> state.queryresponses.prompt);

  const summaryId = useSelector(state => state.queryresponses.currentSummaryId);
  
  useEffect(() => {
    if (view === 'chart') {
      if (suggestions) {
        renderChart(suggestions, chartRefs.questions, query, navigate, dispatch);
      }
      if (prepositions) {
        renderChart(prepositions, chartRefs.prepositions, query, navigate, dispatch);
      }
      if (comparisons) {
        renderChart(comparisons, chartRefs.comparisons, query, navigate, dispatch);
      }
    }
  }, [view, suggestions, prepositions, comparisons]);

  const handleLocalInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleInputChanges = (e) => {
    if (isChat) {
      handleLocalInputChange(e);
    } else {
      handleInputChange(e);
    }
  };

  const handleFooterSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);
    if (isChat) {
      dispatch(setPrompt(inputText)); 
    } else {
      handleSubmit(e).finally(() => {
        setIsLoading(false);
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFooterSubmit(e);
    }
  };

  const handleisChats=(val)=>{
    setIsChats(val);
  }

  const handleTableClick = (query) => {
    setChatTitle(query);
    setIsChats(true);
    dispatch(setIsChat(true));
    dispatch(setPrompt(query)); 
  };
  const handleClickBack=()=>{
    console.log("clicked");
    setIsChats(false);
              dispatch(setIsChat(false));
  }
  
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className={`search-patterns ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} handleisChats={handleisChats} />

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="aisearch-container">
            {/* Search Patterns Button */}
            <button
              className={`create-campaign-button ${activeButton === 'searchPatterns' ? 'active' : ''}`}
              onClick={() => handleButtonClick('searchPatterns')}
            >
              <IoSearch />
              Search Patterns
            </button>

            {/* Create Campaign Button */}
            <button
              className={`create-campaign-button ${activeButton === 'createCampaign' ? 'active' : ''}`}
              onClick={() => handleButtonClick('createCampaign')}
            >
              <FaTv />
              Create Campaign
            </button>
          </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>

        {isChat ? (
          <>
            <Chat title={chatTitle} onBack={handleClickBack} />
          </>
        ) : (
          <>
            <nav className="content-nav">
              <div className="nav-item">
                <a
                  href="#"
                  className={activeTab === 'questions' ? 'active' : ''}
                  onClick={() => setActiveTab('questions')}
                >
                  Questions
                </a>
                {activeTab === 'questions' && (
                  <motion.div className="underline" layoutId="underline" />
                )}
              </div>
              <div className="nav-item">
                <a
                  href="#"
                  className={activeTab === 'prepositions' ? 'active' : ''}
                  onClick={() => setActiveTab('prepositions')}
                >
                  Prepositions
                </a>
                {activeTab === 'prepositions' && (
                  <motion.div className="underline" layoutId="underline" />
                )}
              </div>
              <div className="nav-item">
                <a
                  href="#"
                  className={activeTab === 'comparisons' ? 'active' : ''}
                  onClick={() => setActiveTab('comparisons')}
                >
                  Comparison
                </a>
                {activeTab === 'comparisons' && (
                  <motion.div className="underline" layoutId="underline" />
                )}
              </div>
            </nav>

            <div className="content-area">
              <div className="view-options">
                <button className={`view-button ${view === 'table' ? 'active' : ''}`} onClick={() => setView('table')}>
                  <GoTable />
                  Table View
                </button>
                <button className={`view-button ${view === 'chart' ? 'active' : ''}`} onClick={() => setView('chart')}>
                  <FaChartPie />
                  Chart View
                </button>
              </div>

              {/* Conditional Rendering */}
              {isLoading ? (
                <Loader />
              ) : !hasSearched ? (
                <div className="initial-message" style={{display:"flex",justifyContent:"center"}}>
                  <div style={{display:"flex",flexDirection:"column"}}>
                    <p>Table is here !</p>
                  </div> 
                </div>
              ) : view === 'table' ? (
                <Table activeTab={activeTab} onTableClick={handleTableClick} />
              ) : (
                <div className="chart-container">
                  {activeTab === 'questions' && (
                    <Chart ref={chartRefs.questions} text="Questions" show={suggestions} />
                  )}
                  {activeTab === 'prepositions' && (
                    <Chart ref={chartRefs.prepositions} text="Prepositions" show={prepositions} />
                  )}
                  {activeTab === 'comparisons' && (
                    <Chart ref={chartRefs.comparisons} text="Comparison" show={comparisons} />
                  )}
                </div>
              )}
            </div>
          </>
        )}

        <footer className="main-footer">
          <div className="footer-search">
            <button className="search-button" style={{ fontSize: "25px" }}><IoMicOutline /></button>
            <input
              type="text"
              placeholder="Ask Something"
              ref={inputRef}
              value={inputText || chatprompt || prompt}
              onChange={handleInputChanges}
              onKeyDown={handleKeyPress}
              className="search-input"
              id="input-value"
            />
            <button className="search-button" onClick={handleFooterSubmit}>Submit</button>
          </div>
        </footer>
      </main>
    </div>
  );
}
