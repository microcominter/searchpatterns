import React, { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSummaryAndRelatedQuestions } from '../../services/operations/searchaiAPI.js';
import { FaArrowRight, FaCopy } from 'react-icons/fa';
import Typewriter from '../AI/Typewriter.jsx';
import { updateLatest, updateQuerySummaryAndQuestions } from '../../slices/query.js';
import { Globe, Share2 } from 'lucide-react';
import Loader from '../Loader.jsx';
import { Placeholder, Dropdown } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { SearchContext } from '../../contextApi/SearchContext.jsx';
import { useAuth } from '@clerk/clerk-react';

export default function ChatItem({ query, fadeIn }) {
    const loading = useSelector((state) => state.searchdata.loading);
    const prompt = useSelector((state) => state.queryresponses.prompt);
    const [summary, setSummary] = useState(null);
    const [answerComplete, setAnswerComplete] = useState(!query.latest);
    const [summaryComplete, setSummaryComplete] = useState(!query.latest);
    const [relatedQuestions, setRelatedQuestions] = useState(null);
    const [isCopied, setIsCopied] = useState(false);  // To handle copy action
    const [showShareOptions, setShowShareOptions] = useState(false);  // To handle share dropdown
    const { getToken } = useAuth();
    const dispatch = useDispatch();
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        async function fetchData() {
            if (dataFetchedRef.current) return;
            if (query.summary_id && (!query.summary || !query.relatedQuestions)) {
                dataFetchedRef.current = true;
                const token = await getToken();
                const res = await fetchSummaryAndRelatedQuestions(query.id, token);
                setSummary(res?.summary);
                setRelatedQuestions(res?.relatedQuestions);
                dispatch(updateQuerySummaryAndQuestions({ 
                    summaryId: query.summary_id, 
                    summary: res.summary,
                    relatedQuestions: res.relatedQuestions,
                    id: query.id 
                }));
            } else {
                setSummary(query.summary);
                setRelatedQuestions(query.relatedQuestions);
            }
        }
        
        fetchData();
    }, [query.summary_id, query.id, dispatch, getToken]);

    const handleCopy = () => {
        navigator.clipboard.writeText(query.answer).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);  // Reset copy status after 2 seconds
        });
    };

    return (
        
        <div style={{ display: "flex", justifyContent: "space-around"}}>
            <div className="chat-item" style={{ width: "70%"}}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
            <p className="timestamp">24 minutes ago</p> 
            {/* Share button with dropdown */}
                    <Dropdown show={showShareOptions} onToggle={(isOpen) => setShowShareOptions(isOpen)}>
                        <Dropdown.Toggle as="button" className="share-button">
                            <Share2 className="mr-2" /> Share
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Share via Email</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Share on Twitter</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Copy link</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                <div className="chat-header">
                    <h1 className="main-title">{query.prompt}</h1>
                </div>

                {/* <div style={{ padding: "20px" }}>
                    <h3>Images</h3>
                    {query.images && query.images.length > 0 && (
                        <div className="images-grid" style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #3c4043", height: "8rem", display: "flex", gap: "1rem", overflow: "auto", background: "#3c4043", borderRadius: "25px", padding: "10px" }}>
                            {query.images.map((img, i) => (
                                <img key={i} src={img} alt={`Response image ${i + 1}`} style={{ borderRadius: "25px", objectFit: "cover", objectPosition: "center", width: "100%", height: "100%" }} />
                            ))}
                        </div>
                    )}
                </div> */}

                <div className="ai-response" style={{ padding: "20px", position: "relative" }}>
                    <h3>Answer</h3>
                    <div style={{ padding: "20px", background: "#3c4043", borderRadius: "25px", marginTop: "2rem", position: "relative", textAlign:"justify" }}>
                        <Typewriter 
                            text={query.answer} 
                            onComplete={() => setAnswerComplete(true)}
                            pre={!query.latest}
                        />
                        {/* Copy Icon and Action */}
                        <button className="copy-button" onClick={handleCopy} style={{ position: "absolute", right: "20px", top: "-62px", display: "flex", alignItems: "center", cursor: "pointer", border: "none", background: "#3c4043", color: "#fff",gap:"5px" }}>
                            <FaCopy className="mr-2" /> 
                            {isCopied ? "Copied" : "Copy"}
                        </button>
                    </div>
                </div>

                {summary && (query.latest ? answerComplete : true) && (
                    <div className="summary" style={{ padding: "20px" }}>
                        <h3>Summary:</h3>
                        <div style={{ padding: "20px", background: "#3c4043", borderRadius: "25px", marginTop: "2rem" }}>
                            <Typewriter 
                                text={summary} 
                                onComplete={() => setSummaryComplete(true)}
                                pre={!query.latest}
                            />
                        </div>
                    </div>
                )}

                {relatedQuestions && (query.latest ? summaryComplete : true) && (
                    <section className="explore-section">
                        <h2 className="section-title">Keep Exploring</h2>
                        <ul className="explore-list">
                            {relatedQuestions?.slice(0, 5).map((value, index) => (
                                <li key={index} className="explore-item">
                                    <span>{query.latest ? (<Typewriter text={value} onComplete={() => dispatch(updateLatest({ id: query.id, summary_id: query.summary_id }))} />) : `${value}`}</span>
                                    <FaArrowRight className="explore-icon" />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {loading && (
                    <div className="loading-spinner">
                        <div className="prompt-container">
                            <div className="prompt">{prompt}</div>
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
            </div>

            <motion.aside {...fadeIn} className="sources-section">
                <h2 className="section-title" style={{ marginTop: "0px" }}>Sources</h2>
                {query.sources.slice(0, 3).map((source, index) => (
                    <motion.div 
                        key={index} 
                        {...fadeIn}
                        transition={{ delay: index * 0.1 }}
                        className="source-box"
                    >
                        <h5 className="source-title">{source.name}</h5>
                        <div className="source-info">
                            <Globe className="mr-2" />
                            <span style={{ overflow: "hidden" }}>{source.url.slice(0, 25)}...</span>
                        </div>
                    </motion.div>
                ))}
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="more-sources"
                    style={{padding:"5px", border:"none", borderRadius:"5px"}}
                >
                    + 2 more
                </motion.button>
            </motion.aside>
        </div>
    );
}
