import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/ai.css';
import { CiStar } from "react-icons/ci";
import { FaEllipsisV } from 'react-icons/fa'; // Import FontAwesome 3-dot icon
import { FaBars } from 'react-icons/fa'; // Import FontAwesome bars icon
import avatar from "../../assets/images/user (4).png";
import { useDispatch, useSelector } from 'react-redux';
import { setChats, setCurrentChatId, setIsMainContentVisible, setQueryHistory, setSummaryid } from '../../slices/query.js';
import axios from 'axios';
const RightBar = ({ handleHistoryClick, handlePinToggle }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showPopup, setShowPopup] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [currentItemIndex, setCurrentItemIndex] = useState(null);
    const [isRightSectionVisible, setIsRightSectionVisible] = useState(false);
    const currentChatId = useSelector((state) => state.queryresponses.currentChatId);
    const chats = useSelector((state) => state.queryresponses.chats);
    const queryHistory = useSelector((state) => state.queryresponses.queryHistory);
    const [chatHistory,setChatHistory]=useState([]);
    const summaryid = useSelector((state) => state.queryresponses.summaryid);
    const prompt=useSelector((state)=> state.queryresponses.prompt);
    
    const dispatch = useDispatch();
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
    
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const popupRef = useRef(null);


    useEffect(()=>{
        const token=localStorage.getItem('token');
        async function fetchData(){
            const res=await axios.get('http://localhost:5000/api/getChatHistory',{
                headers:{
                    "Authorization":`Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            setChatHistory(res.data.mssg)
        };
        fetchData();
        
    },[]);
    console.log(chatHistory,"history recieved");
    
    useEffect(() => {
        if (showPopup !== null) {
            setIsPopupVisible(true);
        } else {
            setIsPopupVisible(false);
        }
    }, [showPopup]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsPopupVisible(false);
                setShowPopup(null);
            }
        };

        if (isPopupVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopupVisible]);

    const handlePopupToggle = (index, event) => {
        event.preventDefault();
        if (showPopup === index) {
            setShowPopup(null); // Close if clicked again
        } else {
            setCurrentItemIndex(index);
            setPopupPosition({ x: event.clientX, y: event.clientY });
            setShowPopup(index);
        }
    };

    const handlePinOption = () => {
        handlePinToggle(currentItemIndex);
        setShowPopup(null);
    };

    const handleArchiveOption = () => {
        handleArchive(currentItemIndex);
        setShowPopup(null);
    };

    const handleShareOption = () => {
        handleShare(currentItemIndex);
        setShowPopup(null);
    };

    const handleDeleteOption = (id) => {
        handleDelete(id);
        setShowPopup(null);
    };

    const handleArchive = (index) => {
        console.log('Archive option clicked for index:', index);
        // Implement your archive functionality here
    };

    const handleShare = (index) => {
        const chatToShare = queryHistory[index];
        if (chatToShare) {
            const shareData = {
                title: 'Chat Message',
                text: chatToShare.query,
                url: window.location.href
            };
            navigator.share(shareData)
                .then(() => {
                    console.log('Chat shared successfully');
                })
                .catch(err => {
                    console.error('Failed to share chat: ', err);
                });
        }
    };
 
    const handleDelete = (chatid) => {
        console.log('Delete option clicked for chatId:', chatid, currentChatId);
        console.log("loggg", queryHistory[chatid]);
      
        let updatedHistory = Object.keys(queryHistory)
          .filter(chatId => chatId != chatid)
          .reduce((acc, key) => {
            acc[key] = queryHistory[key];
            return acc;
          }, {});
      
        console.log("updated history", updatedHistory);
        dispatch(setQueryHistory(updatedHistory));
        setCurrentItemIndex(null);
        if (currentChatId === chatid && Object.keys(updatedHistory).length > 0) {
            console.log("selectedddd");

            dispatch(setCurrentChatId(Object.keys(updatedHistory)[0]));
        }
        if (currentChatId === chatid && Object.keys(updatedHistory).length === 0) {
            dispatch(setCurrentChatId(null));
            dispatch(setIsMainContentVisible(true));
        }
        console.log("Deleted query", updatedHistory);
    };

    const handleHistoryHover = (index) => {
        handleHistoryClick(index);
    };

    const handleRightBarHistoryClick = (id) => {
        dispatch(setIsMainContentVisible(false));
        dispatch(setCurrentChatId(id));
        console.log(id);
        
        if (id) {
            dispatch(setSummaryid(id[0].summary_id));
            console.log("hiii",id[0].summary_id);
            
        }
    };

    const handleNewPrompt = () => {
        dispatch(setCurrentChatId(null));
        dispatch(setSummaryid(null));
        dispatch(setIsMainContentVisible(true));
    };

    const toggleRightSection = () => {
        setIsRightSectionVisible(!isRightSectionVisible);
    };
    return (
        <div>
            <button className="toggle-button" onClick={toggleRightSection}>
                <FaBars />
            </button>
            <div className={`right-section ${isDarkMode ? 'dark-mode' : 'light-mode'} ${isRightSectionVisible ? 'visible' : ''}`}>
                {/* <div className="profile-info" style={{ borderBottom: '1px solid #ffffff21' }}>
                    <Image src={avatar} alt="Profile" className="profile-img" roundedCircle />
                </div> */}
               
                <div className="chat-history-container">
                    <div className="chat-history-header">
                        <h3>Chat History</h3>
                        <CiStar style={{ fontSize: 'x-large' }} />
                    </div>
                    <div className="chat-history">
                        {chatHistory
                            .map(chatId => (
                                
                                <div key={chatId} className="history-item">
                
                                    <p className="history-title" onClick={() => handleRightBarHistoryClick(chatId)}>
                                        {chatId[0] ? chatId[0].prompt.slice(0, 15) : ''}...
                                    </p>
                                    <p className="history-description">
                                        {chatId[0] ? (chatId[0]?.summary?.split(':')[1] ? chatId[0]?.summary?.split(':')[1].slice(0, 20) : chatId[0]?.summary?.split(':')[0].slice(0, 20)) : ""}...
                                    </p>
                                    <FaEllipsisV className="three-dot-icon" onClick={(e) => handlePopupToggle(chatId, e)} />
                                    {showPopup === chatId && (
                                        <div ref={popupRef} className="popup-menu" style={{ top: '30px', right: '0px', color: 'black', borderRadius: '3px' }}>
                                            <ul>
                                                <li onClick={handleArchiveOption}>Archive</li>
                                                <li onClick={handleShareOption}>Share</li>
                                                <li onClick={() => handleDeleteOption(chatId)}>Delete</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                <button className="new-prompt-button" style={{ justifyContent: 'center' }} onClick={handleNewPrompt}>New Prompt</button>
                </div>
                
            </div>
        </div>
    );
};

export default RightBar;