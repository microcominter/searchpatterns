import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SideBar from '../../components/AI/SidebarAI.jsx';
import RightBar from '../../components/AI/RightBar.jsx';
import '../../assets/css/mainai.css'
import MainPageContent from '../../components/AI/MaincontentAI.jsx';
import { fetchInfo, fetchSummaryInfo } from '../../services/operations/searchaiAPI.js';
import { setLoading } from '../../slices/search.js';
import { setChats, setCurrentChatId, setIsMainContentVisible, setPrompt, setQueryHistory, setQueryResponse, setSummaryid } from '../../slices/query.js';
import { startRecording, stopRecording } from '../../utils/recording.js';
import CenteredContent from '../../components/AI/CenteredContent.jsx';
import Discover from './Discover.jsx';

function SearchAI() {
    const [query, setQuery] = useState('');
    const [showmic,setShowmic]=useState(false);
    const [scroll,setScroll]=useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [showRelatedQue, setShowRelatedQue] = useState(false);
    const [searched, setSearched] = useState(false);
    const [newResponses, setNewResponses] = useState({});
    const [recording, setRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
  
    
    const queryResponseList = useSelector((state) => state.queryresponses.queryResponse);
    const queryHistory = useSelector((state) => state.queryresponses.queryHistory);
    const summaryid=useSelector((state)=> state.queryresponses.summaryid);
    
    const loading = useSelector((state) => state.searchdata.loading);
    const isMainContentVisible=useSelector((state)=> state.queryresponses.isMainContentVisible);
    const chats=useSelector((state)=> state.queryresponses.chats);
    const currentChatId=useSelector((state)=> state.queryresponses.currentChatId);
    const isSidebarClosed=useSelector((state)=> state.queryresponses.isSidebarClosed);
    const prompt=useSelector((state)=> state.queryresponses.prompt);
    

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const recognitionRef = useRef(null);
    const loadingRef=useRef(null);
    const inputRef = useRef(null);
    const QueryRef = useRef(null);

    let currchatid;
    let handlechats=false;
    // const [currentChatId,setCurrentChatId]=useState(null);
    const location=useLocation();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    // useEffect(()=>{
    //     console.log(transcript,"transctipt");
    // },[transcript])
    
    useEffect(()=>{
       if(prompt && prompt.length>0){
        handleSearch(prompt);
        dispatch(setPrompt(null));
       }
       console.log(":promtp");
       
    },[prompt])

    const createNewChat = () => ({
        queryResponseList: [],
        queryHistory: [],
        currentIndex: -1,
        summary_id: null,
        summary: ''
    });
    const handleNewChat = () => {
        const newChatId = Date.now().toString();
            dispatch(setCurrentChatId(newChatId));
        currchatid=newChatId;
        handlechats=true;
        dispatch(setIsMainContentVisible(true));
        dispatch(setQueryResponse(null));
        const newChatData = createNewChat();
        dispatch(setChats({ chatId: newChatId, chatData: newChatData }));
    };
      
    useEffect(() => {
        
          if (scroll) {
            if(loadingRef.current){
                loadingRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }else if(!loading){
            setScroll(false);
          }
          console.log("scroll");
          
      }, [scroll,loading]);
   

    useEffect(() => {
        const storedHistory = localStorage.getItem('queryHistory');
        if (storedHistory) {
            const parsedHistory = JSON.parse(storedHistory);
            for (const chatId in parsedHistory) {
                dispatch(setQueryHistory({ chatId: chatId, historyData: parsedHistory[chatId] }));
            }
        }
        console.log("stored HIstory");
        
    }, [dispatch]);
    

    
    useEffect(() => {
        const historyToStore = JSON.stringify(queryHistory);
        localStorage.setItem('queryHistory', historyToStore);
    }, [queryHistory]);


    const handleSearch = async (searchQuery) => {
        if (!currentChatId) {
            handleNewChat();
        }
        dispatch(setIsMainContentVisible(false));
        setSearched(true);
        dispatch(setLoading(true));
        setShowSummary(false);
        setShowRelatedQue(false);

        try {
            const result = await fetchInfo(searchQuery, summaryid, dispatch, navigate);
            console.log(result, "response received");
            
            if (result) {
                const responseWithTimestamp = { ...result, timestamp: new Date().toISOString() };
                dispatch(setQueryResponse(responseWithTimestamp));
                let updated_chat;
                if(handlechats){
                    updated_chat = {
                        queryResponseList: [responseWithTimestamp],
                        currentIndex: -1,
                        summary_id: result.summary_id,
                        summary: '' // Initialize with empty summary
                    }
                } else {
                    updated_chat = {
                        queryResponseList: [...chats[currentChatId].queryResponseList, responseWithTimestamp],
                        currentIndex: -1,
                        summary_id: result.summary_id,
                        summary: '' // Initialize with empty summary
                    };
                }
                dispatch(setChats({ chatId: (currentChatId || currchatid), chatData: updated_chat }));
                
                dispatch(setQueryHistory({ chatId: (currentChatId || currchatid), historyData: updated_chat.queryResponseList}));
                dispatch(setSummaryid(result.summary_id));
                setNewResponses((prev) => ({ ...prev, [responseWithTimestamp.timestamp]: true }));
                
                // Fetch summary separately
                fetchSummaryInfo(result.id).then(summary => {
                    if (summary) {
                        const updatedChat = {
                            ...updated_chat,
                            summary: summary
                        };
                        dispatch(setChats({ chatId: (currentChatId || currchatid), chatData: updatedChat }));
                    }
                });
            }
        } catch (error) {
            console.error('Error fetching the answer:', error);
            const errorResponse = { query: searchQuery, answer: 'An error occurred while fetching the answer.', isPinned: false, timestamp: new Date().toISOString() };
            dispatch(setQueryResponse(errorResponse));
            const updatedHistory = [...(queryHistory[currentChatId] || []), errorResponse];
            dispatch(setQueryHistory({ chatId: currentChatId, historyData: updatedHistory }));
        } finally {
            setSearched(false);
            dispatch(setLoading(false));
        }
        setQuery('');
    };
    

    const handleHistoryClick = (historyQuery) => {
        setQuery(historyQuery);
        handleSearch(historyQuery);
    };

    const handlePinToggle = (index) => {
        dispatch(setQueryHistory(
            queryHistory.map((item, idx) => {
                if (idx === index) {
                    return { ...item, isPinned: !item.isPinned };
                }
                return item;
            }).sort((a, b) => b.isPinned - a.isPinned)
        ));
    };

    const handleSearchClick = () => {
        handleSearch(query);
    };

    const handleRelatedQuestionClick = (question) => {
        setQuery(question);
        handleSearch(question);
      
    };
    const handleAnswerComplete = () => {
        setShowSummary(true); // Show summary after the answer completes
    };

    const handleSummaryComplete = () => {
        setShowRelatedQue(true);
    };

    const handleRelatedQuestions = () => {
        
            setShowSummary(true); // Reset showSummary for the next item
        
    };
    const handleMicClick=()=>{
        if(showmic){
            stopRecording(setRecording, mediaRecorderRef, recognitionRef)
            setShowmic(false);
        }
        else{
            startRecording(setRecording, setTranscript, mediaRecorderRef, audioChunksRef, recognitionRef)
            setShowmic(true);
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSearchClick();
        }
    };
    const copyAnswer = () => {
        const answerText = document.querySelector('.answer').innerText;
        navigator.clipboard.writeText(answerText).then(() => {
            alert('Answer copied to clipboard!');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };
    useEffect(() => {
        if (inputRef.current) {
          inputRef.current.style.height = '48px';
          inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 300)}px`;
        }
      }, [query]);

    return (
        <div className="App" style={{ display: "flex",width:"-webkit-fill-available" } }>
            {/* <SideBar /> */}
            {location.pathname==='/searchAI/discover' ? <Discover/>
            :    
            (isMainContentVisible ? (
                <>
                    <MainPageContent  handleKeyPress={handleKeyPress} handleSearchClick={handleSearchClick} setQuery={setQuery} query={query} isSidebarClosed={isSidebarClosed} />
                    <RightBar queryHistory={queryHistory} setQueryHistory={setQueryHistory} handleHistoryClick={handleHistoryClick} handlePinToggle={handlePinToggle} />
                </>
            ) : (
                <>
                    <div className="main-content" style={{ width: isSidebarClosed ? '1250px' : ''}}>
                        <CenteredContent 
                        handleSummaryComplete={handleSummaryComplete}
                        handleMicClick={handleMicClick}
                        showmic={showmic}
                        handleRelatedQuestions={handleRelatedQuestions}
                        handleRelatedQuestionClick={handleRelatedQuestionClick}
                        handleCopyAnswer={copyAnswer}
                        chats={chats}
                        currentChatId={currentChatId}    
                        newResponses={newResponses}
                        QueryRef={QueryRef}
                        handleAnswerComplete={handleAnswerComplete}
                        setNewResponses={setNewResponses}
                        copyAnswer={copyAnswer}
                        showSummary={showSummary}
                        showRelatedQue={showRelatedQue}
                        loading={loading}
                        loadingRef={loadingRef}
                        setScroll={setScroll}
                        query={query}
                        inputRef={inputRef}
                        transcript={transcript}
                        handleKeyPress={handleKeyPress}
                        handleSearchClick={handleSearchClick}
                        setQuery={setQuery}
                        setTranscript={setTranscript}
                        />
                    </div>
                    <RightBar queryHistory={queryHistory} setQueryHistory={setQueryHistory} handleHistoryClick={handleHistoryClick} handlePinToggle={handlePinToggle} />
                </>
            ))
        }
        </div>
    );
}

export default SearchAI;
