import { forwardRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "../contextApi/SearchContext.jsx";
import { renderChart, scrollToChart } from "../utils/renderChart.js";
import { setIsVisible, setLoading } from "../slices/search.js";
import Loader from "./Loader.jsx";
import { useNavigate } from "react-router-dom";
import '../assets/css/chart.css'
const Chart = forwardRef((props, ref) => {
  const { query } = useContext(SearchContext);
  const loading=useSelector((state)=> state.searchdata.loading);

  const { chartRef } = useContext(SearchContext)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  

  useEffect(() => {
    if(props.show){
      renderChart(props.show,ref,query,navigate,dispatch); 
    }
    
  },[props.show])
  
  return (    
        <>
        <h2 className="text-white text-center mt-5" style={{fontFamily: 'denton'}} ref={ref}>{props.text}</h2>
        
        <div id="questions-chart"   style={{ margin: '50px 0' }}></div>
        </>
      ) 
  
});

export default Chart;
