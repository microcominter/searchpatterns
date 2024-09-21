import axios from "axios";
// import { extractSummaryText, formatAnswer, formatRelatedQuestions } from "../../utils/aihelper";
import { endpoints } from "../api";
import { chatHistory, fetchAnswer, fetchContext, fetchRelatedQuestions, fetchSummary, specificChatHistory } from "./apiService.js";
import { setSummaryid, addToChat, createNewChat, setCurrentSummaryId } from "../../slices/query.js";
import { setLoading } from "../../slices/search.js";
// import { setLoading } from '../../slices/loadingSlice';

export async function fetchInfo(query, summaryid, dispatch, navigate,token) {
    dispatch(setLoading(true));
    return fetchAnswer(query, summaryid,token)
        .then(answerData => {
            console.log('Answer fetched:', answerData);
            dispatch(setSummaryid(answerData.summary_id));

            const newQuery = { 
                prompt: query,
                answer: answerData?.answer,
                images: answerData?.images,
                sources:answerData?.sources,
                isPinned: false,
                summary_id: answerData.summary_id,
                id: answerData?.id,
                latest:true
            };

            console.log("newQuery", newQuery,summaryid);
            
            if (summaryid) {
                dispatch(addToChat({ summaryId: summaryid, query: newQuery }));
            } else {
                dispatch(createNewChat({ summaryId: answerData.summary_id, query: newQuery }));
                dispatch(setCurrentSummaryId(answerData.summary_id));
            }

            return newQuery;
        })
        .catch(err => {
            console.error('Error in fetchInfo:', err);
            return null;
        })
        .finally(() => {
            dispatch(setLoading(false));
        });
}

export async function fetchSummaryInfo(id,token) {
    return fetchSummary(id,token)
        .then(summaryData => {
            console.log('Summary fetched:', summaryData);
            return summaryData?.summary;
        })
        .catch(err => {
            console.error('Error in fetchSummaryInfo:', err);
            return null;
        });
}

export async function FetchRelatedQuestions(id,token) {
    return fetchRelatedQuestions(id,token)
        .then(data => {
            console.log('Questions fetched:', data);
            return data?.ans;
        })
        .catch(err => {
            console.error('Error in fetchRelatedQuestions:', err);
            return null;
        });
}

export async function fetchSummaryAndRelatedQuestions(id,token) {
    const summary = await fetchSummaryInfo(id,token);
    const relatedQuestions = await FetchRelatedQuestions(id,token);

    return {
        summary,
        relatedQuestions
    };
}

export async function fetchChatHistory(token) {
    try {
        const data = await chatHistory(token);
        console.log('History fetched:', data);
        return data;
    } catch (err) {
        console.error('Error in fetchChatHistory:', err);
        return null;
    }
}

export async function fetchspecificChatHistory(summary_id, dispatch,token) {
    return specificChatHistory(summary_id,token)
        .then(answerData => {
            console.log('Specific History fetched:', {query:answerData?.mssg});
            // Use the entire mssg array as the query
            dispatch(createNewChat({ summaryId: answerData?.mssg[0]?.summary_id, query: answerData?.mssg,isClicked:true }));
            dispatch(setCurrentSummaryId(answerData?.mssg[0]?.summary_id));
            return answerData?.mssg;
        })
        .catch(err => {
            console.error('Error in fetchRelatedQuestions:', err);
            return null;
        });
}

// export function fetchPromptFromAI(searchQuery, summaryid) {
//   return async (dispatch) => {
//     try {
//       let response;

//       if (summaryid) {
//         response = await axios.post(
//           `${endpoints.AI_API}`,
//           { prompt: searchQuery, summary_id: summaryid }
//         );
//       } else {
//         response = await axios.post(
//           `${endpoints.AI_API}`,
//           { prompt: searchQuery }
//         );
//       }
      
//       const newQuery = { query: searchQuery, answer: response.data.response, images, isPinned: false };

//       const processedSummary = response.data.query_summary.includes(':')
//         ? response.data.query_summary.split(':')[1].trim()
//         : response.data.query_summary;

//       const newQueryWithSummaryAndQuestions = {
//         ...newQuery,
//         summary: processedSummary,
//         relatedQuestions: response.data.related_queries,
//         summary_id: response.data.summary_id
//       };

//       return newQueryWithSummaryAndQuestions;
//     } catch (error) {
//       console.log("Error while fetching Prompt from AI", error);
//       const newQuery = { query: searchQuery, answer: "Sorry !! There seems to be a problem from our side", isPinned: false };
//       const newQueryWithSummaryAndQuestions = {
//         ...newQuery,
//         summary: null,
//         relatedQuestions: null,
//         summary_id: null
//       };

//       return newQueryWithSummaryAndQuestions;
//     }
//   };
// }
