import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'querydata',
  initialState: {
    queryResponse: [],
    queryHistory: {},
    summaryid: null,
    isMainContentVisible: true,
    chats: {},
    currentChatId: null,
    isSidebarClosed: false,
    prompt:null,
    isChat:false,
    currentSummaryId: null,
  },
  reducers: {
    setQueryResponse: (state, action) => {
      if (action.payload) {
        state.queryResponse.push({ ...action.payload, timestamp: new Date().toISOString() });
      } else {
        state.queryResponse = [];
      }
    },
    setQueryHistory: (state, action) => {
      const { chatId, historyData } = action.payload;

      if (chatId) {
        // Update specific chatId in queryHistory
        state.queryHistory[chatId] = historyData;
        // Synchronize chats state with queryHistory
        if (state.chats[chatId]) {
          state.chats[chatId].queryResponseList = historyData;
        } else {
          state.chats[chatId] = { queryResponseList: historyData, currentIndex: -1, summary_id: null, summary: null };
        }
      } else {
        // Update entire queryHistory
        state.queryHistory = action.payload;
        // Synchronize chats state with queryHistory
        state.chats = Object.keys(action.payload).reduce((acc, key) => {
          acc[key] = state.chats[key] || { queryResponseList: action.payload[key], currentIndex: -1, summary_id: null, summary: null };
          return acc;
        }, {});
      }
    },
    setSummaryid: (state, action) => {
      state.summaryid = action.payload;
    },
    setIsMainContentVisible: (state, action) => {
      state.isMainContentVisible = action.payload;
    },
    setChats: (state, action) => {
      const { chatId, chatData } = action.payload;
      if (chatId) {
        state.chats[chatId] = chatData;
        // Synchronize queryHistory state with chats
        state.queryHistory[chatId] = chatData.queryResponseList;
      }
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setIsSidebarClosed: (state, action) => {
      state.isSidebarClosed = action.payload;
    },
    setPrompt:(state,action)=>{
      state.prompt=action.payload;
    },
    setIsChat: (state, action) => {
      state.isChat = action.payload;
    },
    createNewChat: (state, action) => {
      const { summaryId, query,isClicked } = action.payload;
      if(isClicked){
        state.chats[summaryId] = [...query];
      }else{
        state.chats[summaryId] = [{...query, timestamp: Date.now()}];
      }
      console.log("new chat created", state.chats[summaryId]);
    },
    addToChat: (state, action) => {
      const { summaryId, query } = action.payload;
      if (state.chats[summaryId]) {
        state.chats[summaryId].push({...query, timestamp: Date.now()});
      } else {
        state.chats[summaryId] = [{...query, timestamp: Date.now()}];
      }
      console.log("chats updated", state.chats[summaryId]);
    },
    updateQuerySummary: (state, action) => {
      const { summaryId, summary,id } = action.payload;
      if (state.chats[summaryId]) {
        state.chats[summaryId] = state.chats[summaryId].map(query => {
          if (query.id === id) {
            return { ...query, summary };
          }
          return query;
        });
      }
    },
    setCurrentSummaryId:(state,action)=>{
        state.currentSummaryId=action.payload
    },
    updateLatest: (state, action) => {
      const { id, summary_id } = action.payload;
      if (state.chats[summary_id]) {
        state.chats[summary_id] = state.chats[summary_id].map(query => {
          if (query.id === id) {
            return { ...query, latest: false };
          }
          return query;
        });
      }
    },
    updateQuerySummaryAndQuestions: (state, action) => {
      const { summaryId, summary, relatedQuestions, id } = action.payload;
      if (state.chats[summaryId]) {
        state.chats[summaryId] = state.chats[summaryId].map(query => {
          if (query.id === id) {
            return { ...query, summary, relatedQuestions };
          }
          return query;
        });
      }
    }
  },
});

export const {
  createNewChat,
  addToChat,
  setQueryHistory,
  setQueryResponse,
  setSummaryid,
  setIsMainContentVisible,
  setChats,
  setCurrentChatId,
  setIsSidebarClosed,
  setPrompt,
  setIsChat,
  updateQuerySummary,
  setCurrentSummaryId,
  updateLatest,
  updateQuerySummaryAndQuestions
} = slice.actions;

export default slice.reducer;
