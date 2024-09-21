import React, { useContext, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Share2, Globe, ChevronRight } from 'lucide-react';
import { FaArrowRight } from "react-icons/fa";
import { motion } from 'framer-motion'; // Import motion
import ChatHistory from '../../components/Searchpatterns/ChatHistory.jsx';
import "../../assets/css/chat.css";
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { fetchInfo } from '../../services/operations/searchaiAPI.js';
import { setPrompt } from '../../slices/query.js'; // Assuming this action exists
import Loader from '../../components/Loader.jsx'; // Assuming you have a Loader component
import { SearchContext } from '../../contextApi/SearchContext.jsx';
import { useAuth } from '@clerk/clerk-react';

export default function Chat({ title,onBack }) { // Removed `onBack` prop as it's not needed
  const summaryId = useSelector(state => state.queryresponses.currentSummaryId);
  const prompt = useSelector(state => state.queryresponses.prompt); // Assuming this is where the prompt is stored
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Use location to get the previous page info
  const [currentSummaryId, setCurrentSummaryId] = useState(summaryId);
  const loading = useSelector((state) => state.searchdata.loading);
  const { getToken } = useAuth();
  const lastPromptRef = useRef('');

  // Function to get token
  async function generateToken() {
    const t = await getToken();
    return t;
  }

  // Effect to update current summary ID
  useEffect(() => {
    setCurrentSummaryId(summaryId);
  }, [summaryId]);

  // Effect to handle the prompt and fetch data
  useEffect(() => {
    if (prompt && prompt.length > 0 && prompt !== lastPromptRef.current) {
      lastPromptRef.current = prompt;
      generateToken().then(token => {
        console.log(token, "token received");
        fetchInfo(prompt, summaryId, dispatch, navigate, token)
          .then(newQuery => {
            if (newQuery && newQuery.summary_id) {
              setCurrentSummaryId(newQuery.summary_id);
            }
            dispatch(setPrompt(null)); // Clear the prompt after processing
          });
      });
    }
  }, [prompt, summaryId]);

  // Fade in animation
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.1 }
  };

  // Handle back navigation
  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/SearchPatterns');
    }
  };

  return (
    <>
      <motion.header
        {...fadeIn}
        className="header"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="back-button"
          onClick={onBack} // Use the handleBack function here
          style={{ marginLeft: "15px" }}
        >
          <ArrowLeft className="mr-2" />
          Go back to patterns
        </motion.button>
      </motion.header>

      <motion.div
        {...fadeIn}
        className="min-h-screen bg-dark text-light p-4"
        style={{ overflow: "overlay" }}
      >
        <div className="content-container" style={{ gap: "0" }}>
          <motion.main
            {...fadeIn}
            className="main-content"
          >
            <ChatHistory summaryId={currentSummaryId} fadeIn={fadeIn} />
          </motion.main>
        </div>
      </motion.div>
    </>
  );
}
