import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LuArrowRightFromLine, LuArrowLeftToLine } from "react-icons/lu";
import { RiLoader2Fill } from "react-icons/ri";
import splogo from "../../assets/images/search petterns logo1.png"
import { setCurrentChatId, setCurrentSummaryId, setIsMainContentVisible, setQueryHistory } from '../../slices/query.js';
import { fetchChatHistory, fetchspecificChatHistory } from '../../services/operations/searchaiAPI.js';
import { useAuth } from '@clerk/clerk-react';
import { SearchContext } from '../../contextApi/SearchContext.jsx';

export default function Sidebar({ isSidebarOpen, toggleSidebar, handleisChats }) {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const [chatHistory, setChatHistory] = useState([]);
  const prompt = useSelector((state) => state.queryresponses.prompt);
  const [token,setToken]=useState(null);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const t=await getToken();
        setToken(t);
        // console.log(token,t,"token");
        const data = await fetchChatHistory(t);
        console.log(data, "history drawn");
        setChatHistory(data.mssg);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchHistory();
  }, [dispatch, prompt, getToken]);

  // const queryHistory = useSelector((state) => state.queryresponses.queryHistory);
  // useEffect(() => {
  //   if (Object.keys(queryHistory).length === 0) {
  //     const storedHistory = localStorage.getItem('queryHistory');
  //     if (storedHistory) {
  //       const parsedHistory = JSON.parse(storedHistory);
  //       console.log(parsedHistory);
  //       dispatch(setQueryHistory(parsedHistory));
  //     }
  //   }
  // }, [queryHistory, dispatch]);
  const handleHistoryClick = (id) => {
    fetchspecificChatHistory(id, dispatch,token).then(data => {
      dispatch(setCurrentSummaryId(id));
      handleisChats(true);
    })
  };
  useEffect(() => {
    console.log(chatHistory);
  }, [chatHistory])
  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <h1>
            <img src={splogo} alt="" style={{ width: "200px" }} />
          </h1>
        </div>
        <button className="icon-button" onClick={toggleSidebar}>
          {isSidebarOpen ? <LuArrowLeftToLine /> : <LuArrowRightFromLine />}
        </button>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="active">Home</a>
        {/* <a href="searchp">Search Patterns</a>
        <a href="#">Create Campaign</a> */}
        <a href="#">Discover</a>
        {/* <a href="#">Archive</a> */}
        {/* <a href="#">Billing & Subscription</a> */}
        <a href="#">FAQs</a>
      </nav>
      <button className="upgrade-button">
        <RiLoader2Fill /> Upgrade to Pro
      </button>
      <div className="recent-searches">
        <h6>PREVIOUS 30 DAYS</h6>
        <div className="recent-list">
          {chatHistory.map((item, index) => (
            <a
              key={index}
              href="#" 
              onClick={() => handleHistoryClick(item[0]?.summary_id)}
            >
              {item[0]?.prompt?.slice(0, 25) || 'Untitled Chat'}... 
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
