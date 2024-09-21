import { useEffect, useRef, useState, createContext, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuggestions } from '../services/operations/searchAPI.js';
import { setAlphabet, setHasSearched, setLoading, setPrepositions, setSearchCount, setSuggestions, setcomparison } from '../slices/search.js';
import { renderChart, scrollToChart } from '../utils/renderChart.js';
import { useNavigate } from 'react-router-dom';
import { setAuthData } from '../slices/auth.js';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
export const SearchContext = createContext();

export default function ApiContext({ children }) {
  const [query, setQuery] = useState('');
  const chartRef = useRef(null);
  const prepositionChartRef = useRef(null);
  const comparisonChartRef = useRef(null);
  const alphabetChartRef = useRef(null);
  const { isSignedIn,getToken}=useAuth();
  const [token,setToken]=useState(null);
  const hasSearched = useSelector((state) => state.searchdata.hasSearched);
  const loading = useSelector((state) => state.searchdata.loading);
  const suggestions = useSelector((state) => state.searchdata.suggestions);
  const prepositions = useSelector((state) => state.searchdata.prepositions);
  const comparisons = useSelector((state) => state.searchdata.comparisons);
  const alphabets = useSelector((state) => state.searchdata.alphabets);
  const authData = useSelector((state) => state.authdata.authData);
  const searchCount = useSelector((state) => state.searchdata.searchCount);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = useCallback((event) => {
    setQuery(event.target.value);
  }, []);
  // useEffect(()=>{
  //   async function temp(){
      
  //     }
  //     temp();
  // },[token])
  useEffect(()=>{
    async function fetchData(){
      const saveUser=await axios.get("http://localhost:5000/api/user");
      console.log(saveUser,isSignedIn,"user");
      if(isSignedIn){
        console.log("signed in ");
        const t=await getToken();
        setToken(t);
        console.log("token got set");
      }
    }
    fetchData();
  },[])
  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem('authData'));
    if (storedAuthData) {
      dispatch(setAuthData(storedAuthData));
    }
  }, [dispatch]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    if (query.trim() !== '') {
      dispatch(setLoading(true));
      dispatch(setHasSearched(true));
      if (!authData) {
        dispatch(setSearchCount(searchCount + 1));
      }
    } else {
      console.warn('Empty query submitted');
      dispatch(setSuggestions(null));
      dispatch(setPrepositions(null));
      dispatch(setcomparison(null));
      dispatch(setAlphabet(null));
    }
  }, [query, authData, searchCount, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query) {
          const response=await getToken();
          const res = await dispatch(fetchSuggestions(query,response));
          dispatch(setSuggestions(res.suggestions));
          dispatch(setPrepositions(res.prepositions));
          dispatch(setcomparison(res.comparisons));
          dispatch(setAlphabet(res.alphabets));
        }
      } catch (err) {
        dispatch(setSuggestions(null));
        dispatch(setPrepositions(null));
        dispatch(setcomparison(null));
        dispatch(setAlphabet(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (query && hasSearched) {
      fetchData();
    }
  }, [hasSearched, query, dispatch]);

  useEffect(() => {
    if (suggestions) {
      renderChart(suggestions, chartRef, query, navigate, dispatch);
      if (chartRef.current && hasSearched) {
        scrollToChart(chartRef);
        dispatch(setHasSearched(false));
      }
    }
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, [suggestions, query, hasSearched, navigate, dispatch]);

  useEffect(() => {
    if (prepositions) {
      renderChart(prepositions, prepositionChartRef, query, navigate, dispatch);
    }
    return () => {
      d3.select(prepositionChartRef.current).selectAll('*').remove();
    };
  }, [prepositions, query, navigate, dispatch]);

  useEffect(() => {
    if (comparisons) {
      renderChart(comparisons, comparisonChartRef, query, navigate, dispatch);
    }
    return () => {
      d3.select(comparisonChartRef.current).selectAll('*').remove();
    };
  }, [comparisons, query, navigate, dispatch]);

  useEffect(() => {
    if (alphabets) {
      renderChart(alphabets, alphabetChartRef, query, navigate, dispatch);
    }
    return () => {
      d3.select(alphabetChartRef.current).selectAll('*').remove();
    };
  }, [alphabets, query, navigate, dispatch]);

  const contextValue = useMemo(() => ({
    query,
    setQuery,
    chartRef,
    prepositionChartRef,
    comparisonChartRef,
    alphabetChartRef,
    handleSubmit,
    handleInputChange,
    alphabets,
    hasSearched,
    token
  }), [query, handleSubmit, handleInputChange, alphabets, hasSearched]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}
