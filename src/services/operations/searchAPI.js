import { endpoints } from "../api.js";
import { apiConnector } from "../apiconnector.js";
import { setHasSearched, setLoading, setPrepositions, setSuggestions, setcomparison } from '../../slices/search.js';

const { SEARCH_API, PREPOSITION_API, COMPARISION_API, ALPHABET_API } = endpoints;

export function fetchSuggestions(query,token) {
    return async (dispatch) => {
        let allData = {
            suggestions: null,
            prepositions: null,
            comparisons: null,
           
        };

        // Fetch suggestions
        apiConnector("Get", SEARCH_API + `/${query}`, null, token)
            .then(response => {
                allData.suggestions = response?.data?.suggestions || null;
                dispatch(setSuggestions(allData.suggestions));
            })
            .catch(error => {
                console.error('Error fetching suggestions:', error);
            });

        // Fetch prepositions
        apiConnector("Get", PREPOSITION_API + `/${query}`, null, token)
            .then(response => {
                allData.prepositions = response?.data?.suggestions || null;
                dispatch(setPrepositions(allData.prepositions));
            })
            .catch(error => {
                console.error('Error fetching prepositions:', error);
            });

        // Fetch comparisons
        apiConnector("Get", COMPARISION_API + `/${query}`, null, token)
            .then(response => {
                allData.comparisons = response?.data?.suggestions || null;
                dispatch(setcomparison(allData.comparisons));
            })
            .catch(error => {
                console.error('Error fetching comparisons:', error);
            });

        // Fetch alphabets
        // apiConnector("Get", ALPHABET_API + `/${query}`, null, null)
        //     .then(response => {
        //         allData.alphabets = response?.data?.suggestions || null;
                
        //     })
        //     .catch(error => {
        //         console.error('Error fetching alphabets:', error);
        //     });

        
        
        return allData;
    };
}
