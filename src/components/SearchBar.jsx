import React, { useContext, useEffect, useState, useRef } from 'react';
import { SearchContext } from '../contextApi/SearchContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import videoFile from "../assets/videos/hero-desktop.mp4";
import {
  setShowComparison,
  setShowComparisonTable,
  setShowPrepositions,
  setShowPrepositionsTable,
  setShowQuestions,
  setShowQuestionsTable
} from '../slices/show';
import { setPrepositions, setUseCustomPrompt } from '../slices/search';
import { setPrompt } from '../slices/query';
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'; // Add this import
import { useAuth } from '@clerk/clerk-react';

export default function SearchBar({ selected, setSelected,onLoginClick }) {
  const { handleInputChange, handleSubmit, query } = useContext(SearchContext);
  const [showButtons, setShowButtons] = useState(false);
  const [activeButton, setActiveButton] = useState(null); // State to track active button
  const [customPrompt, setCustomPrompt] = useState(''); // State for custom prompt
      // const [useCustomPrompt, setUseCustomPrompt] = useState(false); // State for toggle switch
  const hasSearched = useSelector((state) => state.searchdata.hasSearched);
  const chartsLoaded = useSelector((state) => state.searchdata.chartsLoading);
  const useCustomPrompt = useSelector((state) => state.searchdata.useCustomPrompt);
  const authdata = useSelector((state) => state.authdata.authData);
  const searchCount=useSelector((state)=> state.searchdata.searchCount);
  const inputRef = useRef(null);
  const { isSignedIn } = useAuth();

  const dispatch = useDispatch();
  const navigate=useNavigate();
  useEffect(() => {
    if (!authdata && searchCount >= 10000000) {
      window.location.href = '/';
    }
  }, [searchCount]);

  const handleUnauthenticatedSearch = () => {
      onLoginClick(); // Redirect to sign-in page
  };

  const handleQuestionClick = () => {
    dispatch(setShowQuestions(true));
    dispatch(setShowPrepositions(false));
    dispatch(setShowComparison(false));
    dispatch(setShowQuestionsTable(true));
    dispatch(setShowPrepositionsTable(false));
    dispatch(setShowComparisonTable(false));
    setActiveButton('questions'); // Set active button state
  };

  const handlePrepositionsClick = () => {
    dispatch(setShowQuestions(false));
    dispatch(setShowPrepositions(true));
    dispatch(setShowComparison(false));
    dispatch(setShowQuestionsTable(false));
    dispatch(setShowPrepositionsTable(true));
    dispatch(setShowComparisonTable(false));
    setActiveButton('prepositions'); // Set active button state
  };

  const handleComparisonClick = () => {
    dispatch(setShowQuestions(false));
    dispatch(setShowPrepositions(false));
    dispatch(setShowComparison(true));
    dispatch(setShowQuestionsTable(false));
    dispatch(setShowPrepositionsTable(false));
    dispatch(setShowComparisonTable(true));
    setActiveButton('comparison'); // Set active button state
  };

  const handleSearchClick=(event)=>{
    if (!isSignedIn) {
      handleUnauthenticatedSearch();
      return;
    }
    
    if(!useCustomPrompt){
      handleSubmit(event);
    }else{
      handleProSubmit(event);
    }
  }
  const handleProSubmit=(e)=>{
    e.preventDefault();
    if(customPrompt.length>0){
      dispatch(setPrompt(customPrompt));
      
      setTimeout(() => {
        navigate(`/searchAi/q=query`)
      }, 1000);
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isSignedIn) {
        handleUnauthenticatedSearch();
        return;
      }
      
      if (!useCustomPrompt) {
        handleSubmit(e);
      } else {
        handleProSubmit(e);
      }
    }
  };
  
  useEffect(() => {
    if (chartsLoaded) {
      setShowButtons(true);
    }
  }, [chartsLoaded]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '48px';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 300)}px`;
    }
  }, [customPrompt, query, useCustomPrompt]);

  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible
    };
  const fetchAutocompleteSuggestions = async (input) => {
    if (input.length > 0) {
      let data = JSON.stringify({
        "q": input,
        "gl": "in"
      });
      
      let config = {
        method: 'post',
        url: 'https://google.serper.dev/autocomplete',
        headers: { 
          'X-API-KEY': '729640657296e51b6a87b0b3f44f663ee621b9c4', 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then((response) => {
        setAutocompleteSuggestions(response.data.suggestions);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  else{
    setAutocompleteSuggestions([]);
  }
};

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (!useCustomPrompt) {
        fetchAutocompleteSuggestions(query);
      } else {
        fetchAutocompleteSuggestions(customPrompt);
      }
    }, 400); // Debounce for 300ms

    return () => clearTimeout(debounceTimer);
  }, [query, customPrompt, useCustomPrompt]);
  console.log(autocompleteSuggestions,"autocomplete");
  return (
    <div id="search">
      <div style={{ marginBottom: '0' }}>
        <video autoPlay muted loop id="background-video">
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <AnimatePresence> */}
        <motion.div className="search-container" 
        initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 }}} }>
          <div className="overlay">
            <motion.h1 
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible
            }}
            className="mt-5">Building bridges in the <span>digital</span> landscape...</motion.h1>
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="col-md-10">
                  <div className="card">
                    <div className="row justify-content-center pt-0 pb-0">
                      <div className="col-md-10">
                        
                        <motion.div className="search" variants={itemVariants} query={query} handleInputChange={handleInputChange} >
                          <div className='search-bar' style={{backgroundColor:"white"}}>
                          <form action="" style={{ position: 'relative',display:"flex",float:"none",backgroundColor:"transparent" }} onSubmit={handleSearchClick}>
                            <textarea
                              ref={inputRef}
                              className="search-input text-black"
                              value={useCustomPrompt ? customPrompt : query}
                              onKeyPress={handleKeyPress}
                              onChange={(e) => isSignedIn ? (useCustomPrompt ? setCustomPrompt(e.target.value) : handleInputChange(e)) : null}
                              placeholder={isSignedIn ? (useCustomPrompt ? "Shoot your prompt here..." : "Type something...") : "Please sign in to search"}
                              style={{ height: '50px !important' }}
                              disabled={!isSignedIn}
                            />
                            <div>
                            <button type='submit' className="search-icon" ><i className="bi bi-search" style={{ fontSize: 'large' }}></i></button>                         
                            </div>
                            </form>
                          </div>
                          
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      {/* </AnimatePresence> */}
      </div>

      {chartsLoaded && !useCustomPrompt && (
        <div className={`container ${chartsLoaded ? '' : ''}`}>
          <div className="row">
            <div className="col-md-12">
              <button
                type="button"
                className={`btn btn-outline-light me-2 mt-3 prefixbtn ${activeButton === 'questions' ? 'active' : ''}`}
                onClick={handleQuestionClick}
                disabled={!showButtons}
              >
                Questions
              </button>
              <button
                type="button"
                className={`btn btn-outline-light me-2 mt-3 prefixbtn ${activeButton === 'prepositions' ? 'active' : ''}`}
                onClick={handlePrepositionsClick}
                disabled={!showButtons}
              >
                Prepositions
              </button>
              <button
                type="button"
                className={`btn btn-outline-light me-2 mt-3 prefixbtn ${activeButton === 'comparison' ? 'active' : ''}`}
                onClick={handleComparisonClick}
                disabled={!showButtons}
              >
                Comparisons
              </button>
            </div>
          </div>
        </div>
      )}
      {chartsLoaded && !useCustomPrompt && (
        <div className={`container ${chartsLoaded ? 'sticky-buttons-container' : ''}`}>
          <div className="row">
            <div className="col-md-12">
              <Link to="/searchbox">
                <button type="button" className="btn btn-outline-light me-2 mt-3 prefixbtn" disabled={!showButtons}>
                  Chart
                </button>
              </Link>
              <Link to="/table">
                <button type="button" className="btn btn-outline-light me-2 mt-3 prefixbtn" disabled={!showButtons}>
                  Table
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {autocompleteSuggestions.length > 0 && (
          <motion.div
            className="autocomplete-suggestions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: "10px",
              borderTop: 'none',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 1000,
              width: "60%",
              left: "20%"
            }}
          >
            {autocompleteSuggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className="suggestion-item"
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                  color: 'black',
                  textAlign: "left",
                  fontSize: "x-large"
                }}
                onClick={() => {
                  if (useCustomPrompt) {
                    setCustomPrompt(suggestion.value);
                  } else {
                    handleInputChange({ target: { value: suggestion.value } });
                  }
                  setAutocompleteSuggestions([]);
                }}
              >
                {suggestion.value}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}