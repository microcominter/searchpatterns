// src/apiService.js

import axios from "axios";

const API_URL = 'http://localhost:5000/api';



export const fetchContext = async (prompt) => {
    try{
        const token=localStorage.getItem("token");
        const response = await fetch(`${API_URL}/getContext`,{ 
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ prompt }),
            credentials:"include",
    });
    // const data = await response.json();
    return response.json();
}catch(err){
    console.log(err,"error recieved while fetching context");
    
}
};

export const fetchAnswer = async (prompt,summary_id,token) => {
    try{
       
        const response = await fetch(`${API_URL}/getAnswer`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ prompt,summary_id }),
            credentials:"include",
            mode:"cors"
        });
        // const data = await response.json();
        return response.json();
    }catch(err){
        console.log("error recieved while fetching answer",err);
        
    }
};

export const fetchSummary = async (chatId,token) => {
    try{
        
        const response = await fetch(`${API_URL}/getSummary`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ chatId }),
            credentials:"include",
            mode:"cors"
        });
        // const data = await response.json();
        return response.json();
    }
    catch(err){
        console.log("err recieved while fetching summary",err);
        
    }
};

export const fetchRelatedQuestions = async (chatId,token) => {
    try{
        
        const response = await fetch(`${API_URL}/getRelatedQueries`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ chatId }),
            credentials:"include",
            mode:"cors"
        });
        // const data = await response.json();
        return response.json();
    }
    catch(err){
        console.log("err recieved while fetching questions",err);
        
    }
};
export const chatHistory = async (token) => {
    try {
        console.log("Fetching chat history");
        const response = await fetch(`${API_URL}/getChatHistory`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: "include",
            mode: "cors"
        });
        return response.json();
    }
    catch (err) {
        console.log("Error received while fetching chat history", err);
        throw err;
    }
};

export const specificChatHistory = async (summary_id,token) => {
    try{
       
        const response = await fetch(`${API_URL}/getspecificChatHistory`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ summary_id }),
            credentials:"include",
            mode:"cors"
        });
        // const data = await response.json();
        return response.json();
    }
    catch(err){
        console.log("err recieved while fetching questions",err);
        
    }
};