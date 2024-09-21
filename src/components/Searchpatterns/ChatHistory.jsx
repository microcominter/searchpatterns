import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ChatItem from './ChatItem.jsx';
import { InfinitySpin } from 'react-loader-spinner';

export default function ChatHistory({ summaryId, fadeIn }) {
    const chat = useSelector(state => state.queryresponses.chats[summaryId]);
    const loading = useSelector(state => state.searchdata.loading);
    const chatHistoryRef = useRef(null);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [chat]);

    if (!chat || chat.length === 0) {
        return (
            <div className="loader-container">
                <InfinitySpin
                    visible={true}
                    width="200"
                    color="#FA3C00"
                    ariaLabel="infinity-spin-loading"
                />
            </div>
        );
    }

    return (
        <div className="chat-history" ref={chatHistoryRef} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {chat.map((query, index) => (
                <React.Fragment key={index}>
                    <ChatItem 
                        query={query} 
                        fadeIn={fadeIn}
                    />
                    {index < chat.length - 1 && <hr className="chat-separator" />}
                </React.Fragment>
            ))}
        </div>
    );
}