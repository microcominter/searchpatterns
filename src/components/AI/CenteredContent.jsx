import React, { useEffect, useRef, useState } from 'react'
import { Clipboard2, Layers, MicFill, PencilSquare } from 'react-bootstrap-icons';
import Typewriter from './Typewriter.jsx';
import { IoIosSend, IoMdArrowForward } from 'react-icons/io';
import { Placeholder } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
export default function CenteredContent({newResponses,QueryRef,
    setNewResponses,copyAnswer,showSummary,handleSummaryComplete,showRelatedQue,
    handleRelatedQuestionClick,handleRelatedQuestions,loadingRef,setScroll,query,showmic,handleMicClick
    ,inputRef,transcript,setQuery,handleKeyPress,handleSearchClick,setTranscript

}) {
    const loading = useSelector((state) => state.searchdata.loading);
    const chats=useSelector((state)=> state.queryresponses.chats);
    const currentChatId=useSelector((state)=> state.queryresponses.currentChatId);
    const summaryid=useSelector((state)=> state.queryresponses.summaryid);
    // const currentSummaryId=useSelector((state)=> state )
    const [currentChat, setCurrentChat] = useState([]);
const [newChatIds, setNewChatIds] = useState([]);
const [renderedChatIds, setRenderedChatIds] = useState([]);

const prevSummaryId = useRef(summaryid);
const completedSummaries = useRef({});
   
    // const currentSummaryId=useSelector((state)=> state )
    useEffect(()=>{
        const token=localStorage.getItem('token');
        async function fetchData(){
            const res=await fetch('http://localhost:5000/api/getspecificCHatHistory',{
                method:"post",
                headers:{
                    "Authorization":`Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({id:summaryid}),
            });
            const data=await res.json();
            setCurrentChat(data.mssg)
        };
        fetchData();
    },[summaryid]);
    
    const getElapsedTime = (timestamp) => {
        const now = new Date();
        const elapsed = Math.floor((now - new Date(timestamp)) / 1000); // elapsed time in seconds

        if (elapsed < 60) return 'Just now';
        const minutes = Math.floor(elapsed / 60);
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    };
  
    const [typingStates, setTypingStates] = useState({});

    useEffect(() => {
        if (summaryid !== prevSummaryId.current) {
            prevSummaryId.current = summaryid;
            setTypingStates({});
        }
    }, [summaryid]);

    const handleAnswerComplete = (timestamp) => {
        console.log("oncomplete just got hit");
        setTypingStates(prev => ({
            ...prev,
            [timestamp]: { answerComplete: true, summaryComplete: false }
        }));
    };

    const handleSummaryTypewriterComplete = (timestamp) => {
        setTypingStates(prev => ({
            ...prev,
            [timestamp]: { ...prev[timestamp], summaryComplete: true }
        }));
        handleSummaryComplete();
    };

    return (
        <div className="content" style={{ width: '100%' }}>
                            <div className="header">
                                <h1>My Chats</h1>
                                {/* <div className="icons">
                                    <span><i className="bi bi-star" style={{ fontSize: '20px' }}></i></span>
                                    <span><ThreeDots style={{ fontSize: '20px', opacity: 0.7 }} /></span>
                                </div> */}
                            </div>
                            
                            {chats[currentChatId] && chats[currentChatId].queryResponseList.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="timestamp">{getElapsedTime(item.timestamp)} <span style={{ fontSize: '12px', color: '#888' }}><PencilSquare /></span></div>
                                    
                                    { newResponses[item.timestamp] ? (
                                        <>
                                    <div className="prompt-container" ref={QueryRef} >
                                      
                                        <div className="prompt">{item.query}</div>

                                        <div style={{overflowX:"auto",display:"flex"}}>
                                                            {item.images && item.images.slice(0,4).map(value =>
                                                                (<div >
                                                                    <div style={{padding:"5px",marginTop:"2rem",height:"8rem",overflow:"hidden"}}>
                                                                        <img loading='lazy' src={value} alt="prompt-images" style={{objectFit:"cover",width:"100%",height:"100%",objectPosition:"center",borderRadius:"1rem"}}/>
                                                                    </div>
                                                                </div>)

                                                            )}
                                        </div>
                                        {/* <FormattedText text={item.answer}/> */}
                                        {/* <div dangerouslySetInnerHTML={{ __html: item.answer }} /> */}
                                    <Typewriter text={item.answer} typingSpeed={20} onComplete={() => handleAnswerComplete(item.timestamp)} answer={true} />
                                        <div className="answer">
                                            <button className="copy-btn" onClick={copyAnswer}><Clipboard2 /> copy</button>
                                        </div>
                                    </div>
                                            {item.summary && showSummary && (
                                                <div className="prompt-container" style={{ marginTop: '20px' }}>
                                                    <div className="prompt">Summary</div>
                                                    <div className="answer">
                                                        {typingStates[item.timestamp]?.answerComplete ? (
                                                            <Typewriter text={item.summary} typingSpeed={20} onComplete={() => handleSummaryTypewriterComplete(item.timestamp)} />
                                                        ) : typingStates[item.timestamp]?.summaryComplete ? (
                                                            <div>{item.summary}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            )}
                                            {showRelatedQue && item.relatedQuestions && (
                                                <div className="related-questions" style={{ marginTop: "1rem" }}>
                                                    <h2><Layers /> Keep exploring</h2>
                                                    {item.relatedQuestions.slice(0, 6).map((value, idx) => (
                                                        <div className="related-question" key={idx}>
                                                            <span onClick={() => handleRelatedQuestionClick(value)}> <Typewriter text={value} typingSpeed={300} onComplete={handleRelatedQuestions} /></span>
                                                            <span><IoMdArrowForward /></span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) :
                                    (
                                        <>
                                          <div className="prompt-container" ref={QueryRef}>
                                                <div className="prompt">{item.query}</div>
                                            {/* <Typewriter text={item.answer} speed={25} onComplete={handleAnswerComplete} /> */}
                                            <div style={{overflowX:"auto",display:"flex"}}>
                                                            {item.images && item.images.slice(0,4).map(value =>
                                                                (<div >
                                                                    <div style={{padding:"5px",marginTop:"2rem",height:"8rem",overflow:"hidden"}}>
                                                                        <img loading='lazy' src={value} alt="prompt-images" style={{objectFit:"cover",width:"100%",height:"100%",objectPosition:"center",borderRadius:"1rem"}}/>
                                                                    </div>
                                                                </div>)

                                                            )}
                                        </div>
                                            <Typewriter text={item.answer} pre={true}/>
                                            {/* <div dangerouslySetInnerHTML={{ __html: item.answer }} /> */}
                                                <div className="answer">
                                                    <button className="copy-btn" onClick={copyAnswer}><Clipboard2 /> copy</button>
                                                </div>
                                             </div>
                                            {item.summary && (
                                                <div className="prompt-container" style={{ marginTop: '20px' }}>
                                                    <div className="prompt">Summary</div>
                                                    <div className="answer">
                                                    <Typewriter text={item.summary} pre={true}/>
                                                    </div>
                                                </div>
                                            )}
                                            {console.log(item.relatedQuestions)}
                                            {item.relatedQuestions && (
                                                <div className="related-questions" style={{ marginTop: "1rem" }}>
                                                    <h2><Layers /> Keep exploring</h2>
                                                    {item.relatedQuestions.slice(0, 6).map((value, idx) => (
                                                        <div className="related-question" key={idx}>
                                                            <span onClick={() => handleRelatedQuestionClick(value)}>{value}</span>
                                                            <span><IoMdArrowForward /></span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </React.Fragment>
                            ))}
                            {loading && (
                                <div className="loading-spinner" ref={(el) => {(loadingRef.current = el); setScroll(true)}}>
                                    <div className="prompt-container" >
                                        <div className="prompt"  >{query}</div>
                                        <div style={{ marginTop: "1rem" }}>
                                        <Placeholder as="p" animation="glow">
                                                <Placeholder xs={12} />
                                                <Placeholder xs={12} />
                                                <Placeholder xs={12} />
                                                <Placeholder xs={12} />
                                                <Placeholder xs={12} />
                                                <Placeholder xs={12} />
                                        </Placeholder>
                                        </div>
                                    </div>
                                </div>
            )}          
                        <div style={{display:"flex",flexDirection:"column",marginTop:"2rem"}}>

                          {showmic &&  <div className='mic-tts'>
                                <button
                                type="button"
                                className="mic listening"
                                style={{ width: "40px", height: "40px" }}
                                
                                >
                                <MicFill style={{ fontSize: '20px' }} />
                                </button>
                            </div>}
                           <div className="search-bar "  >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div><MicFill style={{color:'#ff4102', fontSize:'25px'}} onClick={handleMicClick}/></div>
                                    <textarea type="text" placeholder="Ask anything..."
                                    className="search-input"
                                    ref={inputRef}
                                    value={query || transcript}
                                        onChange={(e) => {setQuery(e.target.value);setTranscript((e.target.value))}}
                                        onKeyPress={handleKeyPress} />
                                <div className='ms-2'><IoIosSend onClick={handleSearchClick} style={{color:'#ff4102', fontSize:'40px', cursor:'pointer',paddingRight:'10px'}} /></div>
                                </div>
                            </div>
                                        </div>
                        </div>
    )
};
    