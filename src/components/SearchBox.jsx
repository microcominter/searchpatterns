import { useContext, useState, useEffect } from "react";


import Chart from "./Chart.jsx";
import { useDispatch, useSelector } from "react-redux";
import { renderChart, scrollToChart } from "../utils/renderChart.js";
import Cards from "./Cards.jsx";
import { SearchContext } from "../contextApi/SearchContext.jsx";
import SearchBar from "./SearchBar.jsx";
import { setLoading, setchartsLoading } from "../slices/search.js";
import Loader from "./Loader.jsx";
import { useNavigate } from "react-router-dom";



function SearchBox(onLoginClick) {
  const [selected, setSelected] = useState("IN");
  const {  query, chartRef, prepositionChartRef, comparisonChartRef,hasSearched } = useContext(SearchContext);
  
  const loading=useSelector((state)=>state.searchdata.loading);
  const chartsLoaded=useSelector((state)=> state.searchdata.chartsLoading);
  const dispatch=useDispatch();
  const suggestions=useSelector((state)=>state.searchdata.suggestions);
  const prepositions=useSelector((state)=>state.searchdata.prepositions);
  const comparisons=useSelector((state)=>state.searchdata.comparisons);
  const useCustomPrompt=useSelector((state)=>state.searchdata.useCustomPrompt);

  const showQuestions=useSelector((state)=>state.showvariables.showQuestions);
  const showPrepositions=useSelector((state)=>state.showvariables.showPrepositions);
  const showComparison=useSelector((state)=>state.showvariables.showComparison);
  const navigate=useNavigate();

  useEffect(()=>{
    if(chartRef.current){
      scrollToChart(chartRef);
    }
  },[chartRef])


  useEffect(() => {
    if (hasSearched) {
      if (suggestions) {
        renderChart(suggestions, chartRef,query,navigate,dispatch);
        console.log("hiiiiiiiiiiii again");
      }
      if (prepositions) {
        renderChart(prepositions, prepositionChartRef,query,navigate,dispatch);
      }
      if (comparisons) {
        renderChart(comparisons, comparisonChartRef,query,navigate,dispatch);
      }
      dispatch(setchartsLoading(true));
      
        console.log("charts set to true");
    }
  }, [hasSearched,suggestions,prepositions]);

  return (
    <>
      <section id="home">
        
        <SearchBar onLoginClick={onLoginClick} selected={selected} setSelected={setSelected} chartsLoaded={chartsLoaded} scrollToChart={scrollToChart} loading={loading} />
     
        {chartsLoaded &&  !useCustomPrompt && (showQuestions &&
          
           <Chart ref={chartRef} text="Questions" show={suggestions}/>

          )}
        
        {chartsLoaded &&  !useCustomPrompt && !loading && (showPrepositions &&
          
          <Chart ref={prepositionChartRef} text="Prepositions" show={prepositions}/>
         )}
         {chartsLoaded &&  !useCustomPrompt && !loading && (showComparison &&
          
          <Chart ref={comparisonChartRef} text="Comparison" show={comparisons}/>
         )}
     
          {/* <h2 className="text-white text-center"ref={prepositionChartRef} >Prepositions</h2>
          <div id="prepositions-chart"  style={{ margin: '25px 0' }}></div>
          <h2 className="text-white text-center"  ref={comparisonChartRef}> Comparisons</h2>
          <div id="comparisons-chart" style={{ margin: '25px 0' }}></div> */} 
        

        <Cards/>
      </section>
    </>
  );
}

export default SearchBox;
